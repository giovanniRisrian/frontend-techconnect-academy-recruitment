# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 21:42:43 2022

@author: Lenovo
"""

from pdfminer.high_level import extract_text
import json
import pytesseract
import cv2
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

from spacy.pipeline import EntityRuler
import jsonlines

import en_core_web_sm
nlp = en_core_web_sm.load()
skill_pattern_path = "./python/jz_skill_patterns.jsonl"  
with jsonlines.open("./python/jz_skill_patterns.jsonl") as f:
    created_entities = [line['label'].upper() for line in f.iter()]

ruler = EntityRuler(nlp).from_disk(skill_pattern_path)

nlp.add_pipe(ruler, after='parser')

class ResumeRecognize():
    def __init__(self):
        self.text = None
        self.path = None
        
    def extract_text_from_image(self, image_path):
        custom_oem_psm_config = r'--oem 3 --psm 6'
        img = cv2.imread(image_path)
        text = pytesseract.image_to_string(img,config=custom_oem_psm_config)
            
        return text
    
    def extract_text_from_pdf(self, pdf_path):
        return extract_text(pdf_path)
    
    def extract_phone_number(self, text):           
        PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
        number_phone=[]
        prefix_operator_provider = ["081", "082", "085", "087", "088", "089", "+62"]
        phone = re.findall(PHONE_REG, text)
     
        if phone:
            for p in phone:
                for n in prefix_operator_provider:    
                    if n in p:
                        number_phone.append(p.replace(" ", ""))
                        
            number_phone = list(set(number_phone))
            return number_phone
            
        return None

    def extract_emails(self, text):      
        EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+')
        return re.findall(EMAIL_REG, text)
    
    def extract_URL(self, text):
        URL_REG = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
        url = re.findall(URL_REG, text)      
        return [x[0] for x in url]
    
    def extract_address(self, text):
        split_text = [i.lower() for i in text.splitlines() if i]
        prefix_address = ["jalan", "jl", "jln", "street", "kecamatan", "kelurahan", "perumahan", "komplek", "no.", "blok", "komplek", "kota", "kab.", "kabupaten"]
        address = []
        
        for st in split_text:
            for p in prefix_address:
                if p in st:
                    address.append(st)
        
        address = list(set(address))
        return address
    
    def extract_academic(self, text):
        split_text = [i.lower() for i in text.splitlines() if i]
        prefix_academic = ["universitas", "university", "institute", "institut", "sma", "smp", "sekolah menengah", "high school", "academy", "sekolah tinggi", "sekolah", "politeknik"]
        academic = []
        
        for st in split_text:
            for p in prefix_academic:
                if p in st:
                    academic.append(st)
        
        academic = list(set(academic))
        return academic
    
    def extract_gpa(self, text):
        split_text = [i.lower() for i in text.splitlines() if i]
        prefix_gpa = ["gpa", "ipk"]
        gpa = []
        
        for st in split_text:
            for p in prefix_gpa:
                if p in st:
                    gpa.append(st)
        
        gpa = list(set(gpa))
        return gpa
    
    def extract_experience(self, text):
        split_text = [i.lower() for i in text.splitlines() if i]
        prefix_experience = ["company", "pt.", "lembaga", "institusi", "persero", "tbk"]
        experience = []
        
        for st in split_text:
            for p in prefix_experience:
                if p in st:
                    experience.append(st)
        
        experience = list(set(experience))
        return experience
        
    
    def clean_skills(self, text):
        review = re.sub(
            '(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?"',
            " ",
            text,
        )
        review = review.lower()
        review = review.split()
        lm = WordNetLemmatizer()
        review = [
            lm.lemmatize(word)
            for word in review
            if not word in set(stopwords.words("english"))
        ]
        review = " ".join(review)
        return review

    def get_skills(self, text):
        doc = nlp(text)
        myset = []
        subset = []
        for ent in doc.ents:
            if ent.label_ == "SKILL":
                subset.append(ent.text)
        myset.append(subset)
        return subset
    
    def match_score(self, input_resume, req_skills):
        req_skills = req_skills.lower().split(",")
        resume_skills = self.unique_skills(self.get_skills(input_resume.lower()))
        score = 0
        for x in req_skills:
            if x in resume_skills:
                score += 1
        req_skills_len = len(req_skills)
        match = round(score / req_skills_len * 100, 1)
        return match
        
    def unique_skills(self, x):
        return list(set(x))
    
    def match_score(self, input_resume, req_skills):
        req_skills = req_skills.lower().split(",")
        resume_skills = self.unique_skills(self.get_skills(input_resume.lower()))
        score = 0
        for x in req_skills:
            if x in resume_skills:
                score += 1
        req_skills_len = len(req_skills)
        match = round(score / req_skills_len * 100, 1)
        return match
    
    def scraping_linkedin_profile(self, id_profile):
        from linkedin_api import Linkedin
        api = Linkedin("xxxxx@gmail.com", "xxxxxxx")
        profile = api.get_profile(id_profile)
        return profile
    
    def run(self, path, run_by="pdf"):
        if run_by=="pdf":
            text = self.extract_text_from_pdf(path)
        else:
            text = self.extract_text_from_image(path)
        
        phone_numbers = self.extract_phone_number(text)
        emails = self.extract_emails(text)
        websites = self.extract_URL(text)
        skills = self.unique_skills(self.get_skills(self.clean_skills(text)))
        addresses = self.extract_address(text)
        academics = self.extract_academic(text)
        gpa = self.extract_gpa(text)
        experiences = self.extract_experience(text)
        
        resume_summary = {}
        resume_summary["text"] = text
        resume_summary["phone_number"] = phone_numbers
        resume_summary["email"] = emails
        resume_summary["website"] = websites
        resume_summary["skill"] = skills
        resume_summary["address"] = addresses
        resume_summary["academic"] = academics
        resume_summary["gpa"] = gpa
        resume_summary["experience"] = experiences
        
        return resume_summary
    
def runPython(filename):
    
    rc = ResumeRecognize()
    path = './public/'+filename
    delimit = filename.split('.')
    extension = delimit[-1]
    summary = rc.run(path,extension)
    
    req_skills = 'Data Science,Database,SQL,Machine Learning,tableau,Data Mining,Algorithm,MySQL,programing'
    match_score = rc.match_score(summary["text"], req_skills)
    result = {'summary':summary,'match_score':match_score}
    with open('./public/'+filename+'.json', 'w') as fp:
        json.dump(result, fp,indent=4)

    print("summary:",summary)
    print("match_score:",match_score)
    # Get profile information from linkedin
    # id_profile = None
    # for w in summary["website"]:
    #     if "linkedin.com" in w:
    #         id_profile = w.split("/")[-1]
            
    # profile = rc.scraping_linkedin_profile(id_profile)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    