# 🔍 QC Inspector - Aplicație Control Calitate Materiale Feroase

[![Deploy Status](https://github.com/Gzeu/qc-inspection-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gzeu/qc-inspection-app/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://gzeu.github.io/qc-inspection-app/)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)](https://web.dev/progressive-web-apps/)

## 📋 Descriere

**QC Inspector** este o aplicație web progresivă (PWA) dezvoltată cu React și Vite pentru controlul calității materialelor feroase (plăci, bramă, țevi). Aplicația permite inspectorilor să documenteze defectele materialelor prin fotografii, să adauge note detaliate și să genereze rapoarte PDF profesionale.

🌐 **Demo Live:** [https://gzeu.github.io/qc-inspection-app/](https://gzeu.github.io/qc-inspection-app/)

## ✨ Funcționalități Principale

### 🔍 Inspecție Materiale
- **Selector materiale** - Plăci, bramă și țevi de oțel cu grade și dimensiuni specifice
- **Capturare foto** - Camera nativă + încărcare din galerie  
- **Etichetare defecte** - Interfață interactivă pentru marcarea defectelor pe fotografii
- **Clasificare severitate** - Critical, Major, Minor conform standardelor industriale

### 📱 Capabilități PWA
- **Funcționare offline** - Sincronizare automată când conexiunea este restaurată
- **Instalabil** - Poate fi instalat ca aplicație nativă pe mobile/desktop
- **Notificări push** - Alerte pentru sincronizare și actualizări  
- **Service Worker** - Cache inteligent pentru performanță optimă

### 📄 Raportare și Export
- **Generare PDF** - Rapoarte profesionale cu branding companie
- **Partajare email** - Trimitere automată către părțile interesate
- **Export date** - CSV pentru analiză statistică
- **Istoric complet** - Toate inspecțiile cu căutare și filtrare

## 🛠️ Tehnologii Utilizate

### Frontend
- **React 18** - Framework principal
- **Vite 4** - Build tool și dev server
- **React Router** - Navigare SPA
- **React Hook Form** - Gestionare formulare
- **Lucide React** - Iconuri moderne

### PWA și Offline
- **vite-plugin-pwa** - Configurare PWA
- **Workbox** - Service Worker și caching
- **IndexedDB** - Stocare offline
- **Background Sync** - Sincronizare în fundal

### Utilități  
- **html2pdf.js** - Generare PDF client-side
- **EmailJS** - Serviciu email fără backend
- **React Toastify** - Notificări utilizator
- **LocalForage** - Stocare local îmbunătățită

## 🚀 Instalare și Configurare

### 1. Clonare Repository
```bash
git clone https://github.com/Gzeu/qc-inspection-app.git
cd qc-inspection-app
```

### 2. Instalare Dependențe
```bash
npm install
```

### 3. Configurare Environment
```bash
cp .env.example .env
# Editează .env cu configurațiile tale
```

### 4. Rulare Development
```bash
npm run dev
```

### 5. Build pentru Producție
```bash
npm run build
```

### 6. Preview Build
```bash
npm run preview
```

## 🌐 Deployment GitHub Pages

Aplicația este configurată pentru deployment automat pe GitHub Pages:

1. **GitHub Pages este activat** în Settings → Pages → Source: GitHub Actions
2. **Workflow automat** se execută la fiecare push pe branch-ul `main`
3. **URL live:** https://gzeu.github.io/qc-inspection-app/

### Configurare CI/CD

Workflow-ul include:
- ✅ **Testare automată** - Unit tests și integration tests
- 🔍 **Linting** - Verificare calitate cod
- 🏗️ **Build optimizat** - Vite build cu PWA
- 🚀 **Deploy automat** - La fiecare push pe main

## 📊 Tipuri de Defecte Suportate

### Plăci de Oțel
- Fisuri de suprafață (Critical/Major/Minor)
- Coroziune și rugină
- Calamină și oxidare  
- Zgârieturi și șanțuri
- Incluziuni și laminații

### Bramă de Oțel
- Defecte de suprafață
- Probleme dimensionale
- Incluziuni metalice
- Segregații chimice

### Țevi de Oțel
- Defecte de sudură
- Coroziune internă/externă
- Probleme dimensionale
- Defecte de margine

## 🔧 Configurare EmailJS

Pentru funcționalitatea de email:

1. Creează cont pe [EmailJS](https://www.emailjs.com/)
2. Configurează un serviciu email  
3. Creează un template pentru rapoarte
4. Adaugă credențialele în `.env`:
   ```
   VITE_EMAIL_SERVICE_ID=your_service_id
   VITE_EMAIL_TEMPLATE_ID=your_template_id
   VITE_EMAIL_PUBLIC_KEY=your_public_key
   ```

## 🧪 Testare

```bash
# Rulare toate testele
npm run test

# Testare cu interfață
npm run test:ui

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📱 Instalare ca PWA

### Android
1. Deschide aplicația în Chrome
2. Tap pe meniul "⋮" → "Add to Home screen"
3. Confirmă instalarea

### iOS  
1. Deschide în Safari
2. Tap pe butonul "Share" → "Add to Home Screen"
3. Confirmă adăugarea

### Desktop
1. Deschide în Chrome/Edge
2. Click pe iconița "Install" din address bar
3. Confirmă instalarea

## 🛡️ Securitate și Privacy

- **Fără backend** - Toate datele rămân pe dispozitiv
- **Criptare locală** - Datele sensibile sunt criptate  
- **HTTPS obligatoriu** - Pentru toate funcționalitățile PWA
- **Validare input** - Protecție împotriva atacurilor

## 🤝 Contribuții

1. Fork repository-ul
2. Creează branch pentru feature (`git checkout -b feature/nume-feature`)
3. Commit modificările (`git commit -m 'Adaugă feature nou'`)
4. Push la branch (`git push origin feature/nume-feature`)
5. Deschide Pull Request

## 📄 Licență

Acest proiect este licențiat sub MIT License.

## 📞 Contact

**George Pricop**
- 📧 Email: pricopgeorge@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Gzeu/qc-inspection-app/issues)
- 💼 LinkedIn: [George Pricop](https://www.linkedin.com/in/george-pricop)

---

**Dezvoltat cu ❤️ pentru industria metalurgică românească**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-FF6B6B?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)