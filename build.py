#!/usr/bin/env python3
"""Bakes includes/header.html + includes/footer.html into every page in src/ and writes the site to the project root.
Edit the header/footer ONCE in includes/, then run:  python3 build.py"""
import re,glob,os
R=os.path.dirname(os.path.abspath(__file__))
rd=lambda p:open(os.path.join(R,p),encoding='utf8').read()
NEWS=[('','Emergency in India? Call 112 – do not wait for a website response'),('','Ambulance in Minutes – The Right Ambulance. Right When You Need It.'),
('','12 ambulance categories: BLS · ALS · ICU · Neonatal · Air &amp; more'),('register.html','Ambulance operators: register as a +responder partner →'),
('home-service.html','New: Home healthcare – nursing, attendants &amp; physiotherapy at home →'),('blogs.html','Read our latest health &amp; ambulance guides →'),
('','Hyderabad · Bengaluru · Chennai · Pune · Mumbai · Kalaburagi – expanding across India')]
news=''.join((f'<a class="it" href="{u}">{t}</a>' if u else f'<span class="it">{t}</span>') for u,t in NEWS)
HEAD=rd('includes/header.html').replace('{{NEWS}}',news);FOOT=rd('includes/footer.html')
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">'
for f in sorted(glob.glob(os.path.join(R,'src','[!_]*.html'))):
    src=open(f,encoding='utf8').read();meta=dict(re.findall(r'<!--(\w+):(.*?)-->',src));body=re.sub(r'<!--\w+:.*?-->\n?','',src)
    name=os.path.basename(f);nav=meta.get('nav','').strip()
    hd=HEAD
    for k in ['home','about','service','register','blogs','contact']:
        hd=hd.replace(f' data-nav="{k}"',' class="active" aria-current="page"' if k==nav else '')
    js=''.join(f'<script src="assets/js/{j.strip()}"></script>' for j in meta.get('js','').split(',') if j.strip())
    t=meta['title'].strip();d=meta['desc'].strip();kw=meta.get('kw','').strip()
    page=f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{t}</title><meta name="description" content="{d}">{f'<meta name="keywords" content="{kw}">' if kw else ''}
<meta name="theme-color" content="#e10600"><link rel="canonical" href="https://plusresponder.com/{name if name!='index.html' else ''}">
<meta property="og:type" content="website"><meta property="og:site_name" content="+responder"><meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:url" content="https://plusresponder.com/{name if name!='index.html' else ''}"><meta property="og:image" content="https://plusresponder.com/og-image.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="assets/img/favicon.png"><link rel="apple-touch-icon" href="assets/img/favicon.png">
{FONTS}<link rel="stylesheet" href="assets/css/style.css"></head><body class="{meta.get('cls','inner').strip()}">
{meta.get('pre','').strip()}{hd}
{body}
{FOOT}
<script src="assets/js/main.js"></script>{js}</body></html>'''
    open(os.path.join(R,name),'w',encoding='utf8').write(page);print('built',name)
