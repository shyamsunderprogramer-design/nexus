import React, { createContext, useContext, useState } from 'react';
import { InspectorEntity, University, Company } from '../types';
import { useToast } from '../components/Toast';

export interface CompareEntity {
  id: string;
  type: 'university' | 'company';
  name: string;
  category: string;
  location: string;
  data: University | Company;
}

interface CompareContextType {
  compareList: CompareEntity[];
  addToCompare: (entity: InspectorEntity) => boolean;
  removeFromCompare: (id: string) => void;
  toggleCompare: (entity: InspectorEntity) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 3;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<CompareEntity[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { showToast } = useToast();

  const isInCompare = (id: string) => {
    return compareList.some((item) => item.id === id);
  };

  const addToCompare = (entity: InspectorEntity): boolean => {
    const id = entity.type === 'university' ? entity.data.id : entity.data.oid;
    if (isInCompare(id)) return false;

    if (compareList.length >= MAX_COMPARE) {
      showToast(`Comparison limit reached (max ${MAX_COMPARE} entities). Remove one to add another.`, 'info');
      return false;
    }

    // Check if mixing types (keep universities with universities, companies with companies for clean metrics)
    if (compareList.length > 0 && compareList[0].type !== entity.type) {
      showToast(`Comparison requires matching types (only ${compareList[0].type === 'university' ? 'Campuses' : 'Employers'} at a time).`, 'info');
      return false;
    }

    const newItem: CompareEntity = {
      id,
      type: entity.type,
      name: entity.data.name,
      category: entity.type === 'university' 
        ? ((entity.data as University).carnegie || (entity.data as University).sector || 'Higher Ed')
        : ((entity.data as Company).category || 'Enterprise'),
      location: `${entity.data.city ? entity.data.city + ', ' : ''}${entity.data.state || ''}`,
      data: entity.data,
    };

    const nextList = [...compareList, newItem];
    setCompareList(nextList);
    showToast(`Added ${entity.data.name} to Comparison (${nextList.length}/${MAX_COMPARE})`, 'success');
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (filtered.length === 0) {
        setIsCompareOpen(false);
      }
      return filtered;
    });
    showToast('Removed from comparison', 'info');
  };

  const toggleCompare = (entity: InspectorEntity) => {
    const id = entity.type === 'university' ? entity.data.id : entity.data.oid;
    if (isInCompare(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(entity);
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
    showToast('Comparison cleared', 'info');
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextType => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
