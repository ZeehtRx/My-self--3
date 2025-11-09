from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    data = {
        "name": "Theodorus Ezekiel Drata Halim",
        "role": "AI Enthusiast • Python Developer",
        "bio": "Saya sedang belajar membangun solusi berbasis AI yang bermanfaat untuk masyarakat.",
        
        # 🔹 Badge Teknologi (akan muncul di bawah bio)
        "tech_stack": [
            {"name": "Python", "icon": "fab fa-python", "color": "#3776ab"},
            {"name": "Flask", "icon": "fas fa-fire", "color": "#e47227"},
            {"name": "HTML5", "icon": "fab fa-html5", "color": "#e34f26"},
            {"name": "CSS3", "icon": "fab fa-css3-alt", "color": "#264de4"},
            {"name": "Git", "icon": "fab fa-git-alt", "color": "#f05032"},
            {"name": "GitHub", "icon": "fab fa-github", "color": "#181717"},
            {"name": "AI", "icon": "fas fa-brain", "color": "#6a5acd"},
            {"name": "Machine Learning", "icon": "fas fa-chart-line", "color": "#20c997"}
        ],
        
        # 🔹 Pencapaian
        "achievements": [
            "Peserta Capstone Bootcamp AI IBM",
            "Membangun 3 proyek mini berbasis Python",
            "Belajar machine learning dari nol"
        ],
        
        # 🔹 Tujuan
        "goals": [
            "Membuat aplikasi AI yang membantu UMKM",
            "Diterima magang di perusahaan teknologi",
            "Membangun portofolio open-source yang solid"
        ],
        
        # 🔹 Kontak
        "instagram_url": "https://instagram.com/theoezekiel7",
        "github_url": "https://github.com/ZeehtRx",
        
        # 🔹 Sertifikasi (pastikan file ada di static/img/certs/)
        "certifications": [
            "cert1.jpg",
            "cert2.jpg",
            "cert3.jpg",
            "cert4.jpg",
        ]
    }
    return render_template('index.html', **data)

if __name__ == '__main__':
    app.run(debug=True)