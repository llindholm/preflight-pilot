"""Unpaid educational-content and printable verification. Uses bundled pypdf/pdfplumber."""
from pathlib import Path
import json,re,hashlib,subprocess
from pypdf import PdfReader
import pdfplumber
R=Path(__file__).resolve().parents[1];D=json.loads((R/'lib/pre-fabrication-checklist.json').read_text());P=R/'public/resources/pre-fabrication-review'
def norm(s):return re.sub(r'\s+','',s.replace('\u2014','-').replace('\u2013','-').replace('\u2011','-').replace('\u00a0',' '))
expected={'millwork-pre-fabrication-checklist.pdf':2,'pre-fabrication-item-review.pdf':1,'wc27-completed-item-review.pdf':2};texts={}
for name,count in expected.items():
 reader=PdfReader(P/name);assert len(reader.pages)==count,(name,len(reader.pages));texts[name]=''.join(p.extract_text() for p in reader.pages)
 with pdfplumber.open(P/name) as doc:
  for page in doc.pages:
   assert all(25<=w['x0']<w['x1']<=page.width-25 and 14<=w['top']<w['bottom']<=page.height-14 for w in page.extract_words()),name
 assert 'DRAFT' not in texts[name] and 'NOT A FABRICATION RELEASE' in texts[name]
ct=norm(texts['millwork-pre-fabrication-checklist.pdf']);assert len(D['sections'])==7
for section in D['sections']:
 for text in [section['title'],*section['checks'],section['note']]:assert norm(text) in ct,text
for text in [D['scope'],D['before'],D['reviewedMeaning'],D['finish'],D['completionWarning'],D['methodQualification']]:assert norm(text) in ct,text
wt=norm(texts['pre-fabrication-item-review.pdf']);w=D['worksheet']
for text in [*w['identity'],*w['affected'],*w['evidenceColumns'],w['calculation'],*w['statuses'],w['finding'],w['openQuestion'],*w['followUp'],w['blankWarning'],w['responsibilityWarning']]:assert norm(text) in wt,text
et=norm(texts['wc27-completed-item-review.pdf'])
for field,text in D['example']['rows']:assert norm(field) in et and norm(text) in et,field
assert norm(D['example']['fictional']) in et and norm(D['example']['note']) in et
for name,h in json.loads((P/'sha256.json').read_text()).items():assert hashlib.sha256((P/name).read_bytes()).hexdigest()==h
# Verify retained source files are unchanged and numbered citations resolve to an existing section.
original=R/'public/resources/wc27';manifest=json.loads((original/'sha256.json').read_text())
for n,h in manifest.items():assert hashlib.sha256((original/n).read_bytes()).hexdigest()==h
for i in range(1,7):
 path=next(original.glob(f'R0{i}_*.pdf'));source=PdfReader(path);assert len(source.pages)==1
 for section in [1,2,3] if i in [1,2,3,5,6] else [1,2]:assert f'{section}. ' in source.pages[0].extract_text()
print(json.dumps({'pdfPages':expected,'all21ChecklistPromptsAndNotesPresent':True,'allWorksheetFieldsPresent':True,'all18CompletedEntriesPresent':True,'originalSourceHashesAndSectionsVerified':True,'pageBoundsVerified':True,'scope':'content/geometry integrity, not practitioner validation'},indent=2))
