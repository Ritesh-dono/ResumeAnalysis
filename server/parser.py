import re
import io
import pdfplumber

COMMON_SKILLS = [
    'python', 'java', 'javascript', 'react', 'node', 'flask', 'sql',
    'mongodb', 'c++', 'html', 'css', 'django', 'git', 'docker',
    'aws', 'azure', 'tensorflow', 'pandas', 'numpy'
]

def extract_text_from_pdf(file):
    with pdfplumber.open(file) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    return text.lower()

def extract_info(text):
    email = re.search(r'[\w\.-]+@[\w\.-]+', text)
    phone = re.search(r'(\+91[\-\s]?)?[6-9]\d{9}', text)
    name = text.split('\n')[0]  # crude name assumption from top

    skills = []
    for skill in COMMON_SKILLS:
        if skill in text:
            skills.append(skill)

    return {
        'name': name.strip(),
        'email': email.group(0) if email else '',
        'phone': phone.group(0) if phone else '',
        'skills': skills
    }
