"""Build the three educational PDFs from the same content used by the HTML page.
Requires the existing bundled Python/reportlab runtime; no application dependency.
"""
from pathlib import Path
import json, re, hashlib, argparse
parser=argparse.ArgumentParser();parser.add_argument("--keep-completed-example",action="store_true");args=parser.parse_args()
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Flowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/resources/pre-fabrication-review'
OUT.mkdir(parents=True, exist_ok=True)
D = json.loads((ROOT / 'lib/pre-fabrication-checklist.json').read_text())
FONTS = Path('/System/Library/Fonts/Supplemental')
for name, file in [('Body','Arial.ttf'),('Bold','Arial Bold.ttf'),('Italic','Arial Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONTS/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Italic',boldItalic='Bold')
INK=colors.HexColor('#232823'); GREEN=colors.HexColor('#52684b'); LINE=colors.HexColor('#c0c9ba'); PAPER=colors.HexColor('#edf0e8')
W,H=letter; M=36; WIDTH=W-2*M
styles={
 'body':ParagraphStyle('body',fontName='Body',fontSize=9.5,leading=12.6,textColor=INK,spaceAfter=6),
 'small':ParagraphStyle('small',fontName='Body',fontSize=7.6,leading=10,textColor=INK,spaceAfter=4),
 'label':ParagraphStyle('label',fontName='Bold',fontSize=9.2,leading=12,textColor=INK,spaceAfter=5),
 'h':ParagraphStyle('h',fontName='Bold',fontSize=12,leading=15,textColor=GREEN,spaceBefore=10,spaceAfter=7),
 'title':ParagraphStyle('title',fontName='Bold',fontSize=20,leading=24,textColor=INK,spaceAfter=8),
}
def clean(s):
    return s.replace('\u2014',' - ').replace('\u2013','-').replace('\u2011','-').replace('\u00a0',' ')
def P(s,sty='body'):return Paragraph(escape(clean(s)),styles[sty])
def link(label,url):return '<a href="'+escape(url,{'"':'&quot;'})+'" color="#445b40"><u>'+escape(clean(label))+'</u></a>'
def footer(c,doc):
    c.saveState();c.setStrokeColor(LINE);c.line(M,30,W-M,30);c.setFont('Body',7);c.setFillColor(INK)
    c.drawString(M,19,'GROUNDSTATE / EDUCATIONAL COORDINATION AID / NOT A FABRICATION RELEASE')
    c.drawRightString(W-M,19,str(doc.page));c.restoreState()
def doc(name,story):
    SimpleDocTemplate(str(OUT/name),pagesize=letter,rightMargin=M,leftMargin=M,topMargin=32,bottomMargin=44,title=D['title'],author='Groundstate',pageCompression=1).build(story,onFirstPage=footer,onLaterPages=footer)
class Box(Flowable):
    def __init__(self):super().__init__();self.width=9;self.height=10
    def draw(self):self.canv.setStrokeColor(GREEN);self.canv.setLineWidth(.65);self.canv.rect(0,0,8,8)
def check_section(i):
    s=D['sections'][i]
    column=ParagraphStyle('column',parent=styles['label'],alignment=1,spaceAfter=0)
    heading=Table([[P(f'{i+1}. '+s['title'],'h'),*[Paragraph(x,column) for x in ['R','F','N']]]],colWidths=[WIDTH-66,22,22,22],hAlign='LEFT')
    heading.setStyle(TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),('VALIGN',(0,0),(-1,-1),'MIDDLE')]))
    items=[heading]
    rows=[]
    for q in s['checks']:rows.append([P(q),Box(),Box(),Box()])
    t=Table(rows,colWidths=[WIDTH-66,22,22,22],hAlign='LEFT')
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('ALIGN',(1,0),(-1,-1),'CENTER'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(0,-1),10),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    items.append(t);note=s['note']+(' ['+', '.join(s.get('sources',[]))+']' if s.get('sources') else '')
    items.extend([P(note,'small'),P('References / follow-up / N/A reason: ____________________________________________________','small')])
    return KeepTogether(items)
# Two-page checklist. Every prompt has R/F/N columns, not an approval score.
legend='For every question, tick ONE box in its R / F / N columns. R = Reviewed with reference; F = Follow-up needed; N = Not applicable-with reason. Record references, follow-up or the N/A reason on the section line or an item-review sheet.'
head=P('Before you start','label')
story=[P('GROUNDSTATE / EDUCATIONAL AID','label'),P(D['title'],'title'),P(D['subtitle']),P(D['scope'],'small'),head,P(D['before']),P(legend,'small'),P(D['reviewedMeaning'],'small')]
for i in range(3):story.append(check_section(i))
story.extend([PageBreak(),P('CHECKLIST CONTINUED','label'),P('Checks 4-7 and follow-up','title'),P(legend,'small'),P(D['reviewedMeaning'],'small')])
for i in range(3,7):story.append(check_section(i))
story.extend([P('Finish the review','h'),P(D['finish']),P(D['completionWarning'],'label'),P(D['methodQualification'],'small')])
sourcebits=[link('S1: AWI 100 §3.2',D['guidance'][0]['links'][0]['url']),link('S2: §3.3',D['guidance'][1]['links'][0]['url']),link('§3.4(g)',D['guidance'][1]['links'][1]['url'])]
story.append(Paragraph('Published guidance (not verbatim checklist requirements): '+' / '.join(sourcebits),styles['small']))
doc('millwork-pre-fabrication-checklist.pdf',story)
# One portrait sheet for one issue, designed for handwriting rather than data entry.
c=canvas.Canvas(str(OUT/'pre-fabrication-item-review.pdf'),pagesize=letter);c.setTitle('Pre-Fabrication Item Review');c.setAuthor('Groundstate')
def txt(s,x,y,size=9,bold=False):c.setFont('Bold' if bold else 'Body',size);c.setFillColor(INK);c.drawString(x,y,clean(s))
def para(s,x,top,width=WIDTH,sty='small'):
    p=P(s,sty);_,h=p.wrap(width,1000);p.drawOn(c,x,top-h);return top-h

def field(label,x,y,width=WIDTH,lines=1):
    txt(label,x,y,8.2,True);c.setStrokeColor(LINE);c.setLineWidth(.5)
    for i in range(lines):c.line(x,y-16-i*15,x+width,y-16-i*15)
    return y-23-(lines-1)*15

def inline_field(label,x,y,width=WIDTH):
    txt(label,x,y,8.2,True);c.setStrokeColor(LINE);c.setLineWidth(.5)
    start=x+pdfmetrics.stringWidth(clean(label),'Bold',8.2)+7
    c.line(start,y-2,x+width,y-2)
    return y-18

def section(label,y):
    y-=6
    c.setFillColor(PAPER);c.rect(M,y-6,WIDTH,17,fill=1,stroke=0);txt(label,M+6,y,9,True);return y-19

txt('ONE ISSUE PER SHEET',M,760,8,True);txt(D['worksheet']['title'],M,735,20,True);txt(D['worksheet']['subtitle'],M,719,9)
w=D['worksheet'];y=704
y=inline_field('Project:',M,y)
half=(WIDTH-18)/2
inline_field('Area / package:',M,y,half);y=inline_field('Package issue / date:',M+half+18,y,half)
inline_field('Reviewed by / role:',M,y,half);y=inline_field('Review date:',M+half+18,y,half)
y=section('Affected item',y)
y=inline_field('Item / location:',M,y);y=inline_field('Current drawing / detail / revision:',M,y);y=field('What is being checked?',M,y)
y=section('Supporting evidence',y)
# Three evidence rows, with column labels wrapped rather than truncated.
cols=[165,120,WIDTH-285];x=M
for label,width in zip(w['evidenceColumns'],cols):para(label,x+5,y,width-10,'small');x+=width
c.setStrokeColor(LINE);top=y+3;bottom=y-76
for yy in [top,y-22,y-40,y-58,bottom]:c.line(M,yy,W-M,yy)
x=M
for width in [0,*cols]:x+=width;c.line(x,top,x,bottom)
y=field(w['calculation']+':',M,bottom-16,lines=3)
y=section('Review status - select all that apply',y)
for label in w['statuses']:
 c.setStrokeColor(GREEN);c.rect(M,y-1,7,7);txt(label+(' ____________________' if 'Not applicable' in label else ''),M+14,y,8.1);y-=13
# Short but dedicated writing rows; follow-up fields are not pre-filled decisions.
y=field(w['finding'],M,y-3,lines=3);y=field(w['openQuestion'],M,y,lines=3)
y=section('Follow-up',y)
inline_field('Responsible person / role:',M,y,half);y=inline_field('Needed by / relevant milestone:',M+half+18,y,half)
y=field('Next action:',M,y)
y=field('Applicable restriction or release requirement, with source:',M,y)
y=inline_field('Resolution reference / date:',M,y)
y=field('Affected documents updated / recipients notified:',M,y)
y=para(w['blankWarning'],M,y-2,sty='small')
y=para(w['responsibilityWarning'],M,y-3,sty='small')
if y<37:raise RuntimeError(f'Worksheet overflows: bottom {y}')
class Page:page=1
footer(c,Page());c.showPage();c.save()
# Completed worksheet, exactly the supplied entries; source tokens link to original PDFs.
dates=['02','04','07','09','10','11']
def referenced(s):
    s=escape(clean(s))
    return re.sub(r'R0([1-6])',lambda m:link(m.group(0),'https://preflight.lhlapps.com/resources/wc27/'+m.group(0)+'_2026-09-'+dates[int(m.group(1))-1]+'.pdf#page=1'),s)
def completed_rows(rows):
    t=Table([[P(k,'label'),Paragraph(referenced(v),styles['body'])] for k,v in rows],colWidths=[138,WIDTH-138],hAlign='LEFT')
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LINEABOVE',(0,0),(-1,-1),.5,LINE),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),6)]));return t
rows=D['example']['rows'];story=[P('FICTIONAL TRAINING EXAMPLE','label'),P(D['example']['title'],'title'),P(D['example']['fictional']),P('All cited records: page 1. Section numbers refer to original record headings. No review event is represented as having occurred.','small'),completed_rows(rows[:10]),PageBreak(),P('FICTIONAL WC27 EXAMPLE CONTINUED','label'),P('Findings, open questions and follow-up','title'),completed_rows(rows[10:]),Spacer(1,8),P(D['example']['note']),P(D['completionWarning'],'label')]
if not args.keep_completed_example:
    doc('wc27-completed-item-review.pdf',story)
manifest={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(OUT.glob('*.pdf'))}
(OUT/'sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'files':list(manifest),'worksheetBottom':round(y,1)},indent=2))
