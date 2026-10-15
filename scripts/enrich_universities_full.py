#!/usr/bin/env python3
"""
enrich_universities_full.py
Enriches universities.json with comprehensive, unassailable federal data:
- NCES IPEDS HD2023: Aliases, Leadership (President/Chancellor), System, Address, County,
  Phone, HBCU, Tribal, Land-Grant, Hospital, Medical School, Veterans Portal, Athletics Portal,
  Disability Services, Financial Aid.
- NCES IPEDS ADM2023: Applicants, Admitted, Acceptance Rate %, SAT Math/Reading 25-75th, ACT Composite 25-75th.
- NCES IPEDS EF2023D: Retention Rate %, Student-to-Faculty Ratio.
- Curated top-university acronym index for flawless search recall.
"""

import csv
import json
import os
import re

ROOT = "/Volumes/Storage/D Drive /Rep/nexus"
UNIS_DATA_PATH = os.path.join(ROOT, "public", "data", "universities.json")
APP_UNIS_DATA_PATH = os.path.join(ROOT, "app", "data", "universities.json")
USA_DATA_DIR = "/Volumes/Storage/D Drive /Rep/universities/USA/data"

HD_PATH = os.path.join(USA_DATA_DIR, "HD2023.csv")
ADM_PATH = os.path.join(USA_DATA_DIR, "adm2023.csv")
EF_PATH = os.path.join(USA_DATA_DIR, "ef2023d.csv")

# Curated high-recall aliases for prominent universities where IALIAS is empty or partial in IPEDS
POPULAR_ACRONYMS = {
    "166027": "Harvard, Harvard College, Harvard University",
    "243744": "Stanford, Stanford University, Cardinal",
    "193900": "NYU, New York University",
    "190150": "Columbia, Columbia University, CU, Columbia College",
    "198419": "Duke, Duke University, Blue Devils",
    "147767": "Northwestern, Northwestern University, NU",
    "144050": "UChicago, University of Chicago, Chicago",
    "215062": "Penn, UPenn, University of Pennsylvania, Wharton",
    "166683": "MIT, Massachusetts Institute of Technology",
    "110404": "Caltech, California Institute of Technology",
    "110662": "UCLA, University of California Los Angeles",
    "110635": "UC Berkeley, Cal, Berkeley, University of California Berkeley",
    "123961": "USC, University of Southern California, Trojans",
    "179867": "WashU, WUSTL, Washington University in St. Louis",
    "139940": "Georgia Tech, GT, Georgia Institute of Technology",
    "145637": "UIUC, Illinois, University of Illinois Urbana-Champaign",
    "170976": "UMich, Michigan, University of Michigan Ann Arbor",
    "236948": "UW, U-Dub, University of Washington Seattle",
    "228778": "UT Austin, Texas, Longhorns, University of Texas at Austin",
    "228723": "TAMU, Texas A&M, Aggies, Texas A and M",
    "199120": "UNC, UNC Chapel Hill, Tar Heels, University of North Carolina",
    "234076": "UVA, Virginia, Wahoos, University of Virginia",
    "233921": "Virginia Tech, VT, VPI, Virginia Polytechnic",
    "243780": "Purdue, Purdue University, Boilermakers",
    "204796": "Ohio State, OSU, Buckeyes, Ohio State University",
    "151351": "IU, Indiana University Bloomington, Hoosiers",
    "126614": "CU Boulder, Colorado, Buffs, University of Colorado Boulder",
    "104151": "ASU, Arizona State, Sun Devils, Arizona State University",
    "104179": "UofA, Arizona, Wildcats, University of Arizona",
    "181464": "UNL, Nebraska, Cornhuskers, University of Nebraska Lincoln",
    "240444": "UW Madison, Wisconsin, Badgers, University of Wisconsin",
    "174066": "UMN, Minnesota, Golden Gophers, University of Minnesota",
    "153658": "Iowa, Hawkeyes, University of Iowa",
    "153603": "Iowa State, ISU, Cyclones, Iowa State University",
    "131520": "Howard, Howard University, Bison, HU",
    "190415": "Cornell, Cornell University, Big Red",
    "130794": "Yale, Yale University, Bulldogs",
    "186131": "Princeton, Princeton University, Tigers",
    "164924": "BC, Boston College, Eagles",
    "164988": "BU, Boston University, Terriers",
    "217156": "Brown, Brown University, Bears",
    "182670": "Dartmouth, Dartmouth College, Big Green",
    "216597": "Villanova, Nova, Wildcats, Villanova University",
    "152080": "Notre Dame, ND, Fighting Irish, University of Notre Dame",
    "221999": "Vanderbilt, Vandy, Commodores, Vanderbilt University",
    "149772": "Loyola Chicago, LUC, Ramblers",
    "165015": "Brandeis, Brandeis University",
    "168148": "Tufts, Tufts University, Jumbos",
    "167358": "Northeastern, NEU, Huskies, Northeastern University",
    "213020": "Lehigh, Lehigh University, Mountain Hawks",
    "211440": "CMU, Carnegie Mellon, Carnegie Mellon University",
    "195030": "RPI, Rensselaer Polytechnic Institute, Rensselaer",
    "196413": "Syracuse, Cuse, Orange, Syracuse University",
    "195003": "Rochester, U of R, Yellowjackets, University of Rochester",
}

def clean_url(url: str) -> str:
    if not url:
        return ""
    u = url.strip().strip('"')
    if not u or u.lower() in ["n/a", "none", "null", "-1", "-2"]:
        return ""
    if not u.startswith(("http://", "https://")):
        u = "https://" + u
    return u

def safe_float(val):
    try:
        return float(val)
    except (TypeError, ValueError):
        return None

def safe_int(val):
    try:
        return int(float(val))
    except (TypeError, ValueError):
        return None

def main():
    print(f"Loading existing universities from {UNIS_DATA_PATH}...")
    with open(UNIS_DATA_PATH, "r", encoding="utf-8") as f:
        unis = json.load(f)

    print(f"Loaded {len(unis):,} universities. Reading IPEDS datasets...")

    # 1. Load HD2023
    hd_map = {}
    if os.path.exists(HD_PATH):
        with open(HD_PATH, "r", encoding="utf-8-sig", errors="ignore") as f:
            for r in csv.DictReader(f):
                uid = r.get("UNITID", "").strip()
                if uid:
                    hd_map[uid] = r
        print(f"Loaded {len(hd_map):,} records from HD2023.")

    # 2. Load ADM2023
    adm_map = {}
    if os.path.exists(ADM_PATH):
        with open(ADM_PATH, "r", encoding="utf-8-sig", errors="ignore") as f:
            for r in csv.DictReader(f):
                uid = r.get("UNITID", "").strip()
                if uid:
                    adm_map[uid] = r
        print(f"Loaded {len(adm_map):,} records from ADM2023.")

    # 3. Load EF2023D (retention & stufac)
    ef_map = {}
    if os.path.exists(EF_PATH):
        with open(EF_PATH, "r", encoding="utf-8-sig", errors="ignore") as f:
            for r in csv.DictReader(f):
                uid = r.get("UNITID", "").strip()
                if uid:
                    ef_map[uid] = r
        print(f"Loaded {len(ef_map):,} records from EF2023D.")

    enriched_count = 0
    with_adm_count = 0
    with_alias_count = 0

    for u in unis:
        uid = str(u.get("id", ""))
        hd_row = hd_map.get(uid)
        adm_row = adm_map.get(uid)
        ef_row = ef_map.get(uid)

        if hd_row:
            enriched_count += 1
            # Aliases & Acronyms
            fed_alias = hd_row.get("IALIAS", "").strip()
            curated_alias = POPULAR_ACRONYMS.get(uid, "")
            
            combined_aliases = []
            if fed_alias:
                combined_aliases.append(fed_alias)
            if curated_alias and curated_alias not in fed_alias:
                combined_aliases.append(curated_alias)
            
            if combined_aliases:
                u["alias"] = " | ".join(combined_aliases)
                with_alias_count += 1

            # Leadership
            chfnm = hd_row.get("CHFNM", "").strip()
            chftitle = hd_row.get("CHFTITLE", "").strip()
            if chfnm and chfnm not in ["-1", "-2", ""]:
                u["chief_executive"] = chfnm
                u["chief_title"] = chftitle if chftitle and chftitle not in ["-1", "-2", ""] else "President"

            # University System
            sysname = hd_row.get("F1SYSNAM", "").strip()
            if sysname and sysname not in ["-1", "-2", ""]:
                u["system"] = sysname

            # Address, Zip, County, Phone
            addr = hd_row.get("ADDR", "").strip()
            zip_code = hd_row.get("ZIP", "").strip()
            county = hd_row.get("COUNTYNM", "").strip()
            phone = hd_row.get("GENTELE", "").strip()

            if addr:
                u["address"] = addr
            if zip_code:
                u["zip"] = zip_code
            if county:
                u["county"] = county
            if phone:
                u["phone"] = phone

            # Special Designations
            if hd_row.get("HBCU") == "1":
                u["hbcu"] = True
            if hd_row.get("TRIBAL") == "1":
                u["tribal"] = True
            if hd_row.get("LANDGRNT") == "1":
                u["landgrant"] = True
            if hd_row.get("HOSPITAL") == "1":
                u["hospital"] = True
            if hd_row.get("MEDICAL") == "1":
                u["medical_school"] = True

            # Specialized Direct Portals
            vet_url = clean_url(hd_row.get("VETURL", ""))
            ath_url = clean_url(hd_row.get("ATHURL", ""))
            disa_url = clean_url(hd_row.get("DISAURL", ""))
            faid_url = clean_url(hd_row.get("FAIDURL", ""))

            if vet_url:
                u["veterans_url"] = vet_url
            if ath_url:
                u["athletics_url"] = ath_url
            if disa_url:
                u["disability_url"] = disa_url
            if faid_url:
                u["financial_aid_url"] = faid_url

        # Admissions Selectivity
        if adm_row:
            appl = safe_float(adm_row.get("APPLCN"))
            adms = safe_float(adm_row.get("ADMSSN"))
            enrl = safe_float(adm_row.get("ENRLT"))

            if appl and appl > 0 and adms and adms > 0:
                u["applicants"] = int(appl)
                u["admissions"] = int(adms)
                u["adm_rate"] = round(adms / appl * 100, 1)
                with_adm_count += 1
            if enrl and enrl > 0:
                u["enrolled"] = int(enrl)

            # SAT scores (Reading 25-75, Math 25-75)
            sat_vr25 = adm_row.get("SATVR25", "").strip()
            sat_vr75 = adm_row.get("SATVR75", "").strip()
            sat_mt25 = adm_row.get("SATMT25", "").strip()
            sat_mt75 = adm_row.get("SATMT75", "").strip()

            if sat_vr25 and sat_vr75 and sat_vr25 not in ["-", ""]:
                u["sat_reading"] = f"{sat_vr25}–{sat_vr75}"
            if sat_mt25 and sat_mt75 and sat_mt25 not in ["-", ""]:
                u["sat_math"] = f"{sat_mt25}–{sat_mt75}"

            # ACT Composite 25-75
            act_25 = adm_row.get("ACTCM25", "").strip()
            act_75 = adm_row.get("ACTCM75", "").strip()
            if act_25 and act_75 and act_25 not in ["-", ""]:
                u["act_composite"] = f"{act_25}–{act_75}"

        # Retention & Student-Faculty Ratio
        if ef_row:
            ret = safe_float(ef_row.get("RET_PCF"))
            stufac = safe_int(ef_row.get("STUFACR"))
            if ret and ret > 0:
                u["retention_rate"] = int(ret)
            if stufac and stufac > 0 and "stufac" not in u:
                u["stufac"] = stufac

    print(f"Summary of enrichment:")
    print(f"- Total institutions processed: {len(unis):,}")
    print(f"- Enriched with HD2023 metadata: {enriched_count:,}")
    print(f"- With searchable Aliases & Acronyms: {with_alias_count:,}")
    print(f"- With official Acceptance Rates & SAT/ACT: {with_adm_count:,}")

    # Save to public and app data paths
    for p in [UNIS_DATA_PATH, APP_UNIS_DATA_PATH]:
        if os.path.exists(os.path.dirname(p)):
            print(f"Saving enriched dataset to {p}...")
            with open(p, "w", encoding="utf-8") as f:
                json.dump(unis, f, separators=(",", ":"))

    print("Enrichment complete!")

if __name__ == "__main__":
    main()
