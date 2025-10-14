# 🚀 Website Deployment Anleitung

## Option 1: Vercel (EMPFOHLEN - Kostenlos & Einfach)

### Schritte:
1. **Vercel Account erstellen**: Gehe zu [vercel.com](https://vercel.com)
2. **GitHub Repository erstellen** (optional aber empfohlen):
   - Erstelle ein GitHub Repository
   - Pushe deinen Code zu GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```
3. **Mit Vercel verbinden**:
   - Klicke auf "New Project" in Vercel
   - Importiere dein GitHub Repository
   - Vercel erkennt automatisch Vite
   - Klicke auf "Deploy"
4. **Fertig!** Du bekommst eine URL wie: `https://lauffer-gartenbau.vercel.app`

### Automatische Updates:
- Jede Änderung, die du zu GitHub pushst, wird automatisch deployed!

---

## Option 2: Netlify (Auch kostenlos)

### Schritte:
1. **Netlify Account**: Gehe zu [netlify.com](https://netlify.com)
2. **Build erstellen**:
   ```bash
   npm run build
   ```
3. **Deploy**:
   - Klicke auf "Sites" → "Add new site" → "Deploy manually"
   - Ziehe den `dist` Ordner per Drag & Drop
4. **Fertig!** URL: `https://lauffer-gartenbau.netlify.app`

---

## Option 3: GitHub Pages (Kostenlos)

### Schritte:
1. **GitHub Repository erstellen** und Code pushen
2. **vite.config.ts anpassen**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/REPOSITORY_NAME/', // Ersetze mit deinem Repo-Namen
   })
   ```
3. **Build & Deploy**:
   ```bash
   npm run build
   # Dann nutze gh-pages package oder pushe dist zu gh-pages branch
   ```

---

## Option 4: Eigener Server / Webhosting

### Schritte:
1. **Build erstellen**:
   ```bash
   npm run build
   ```
2. **dist Ordner hochladen**:
   - Per FTP zum Webhosting
   - Der `dist` Ordner enthält alle fertigen Dateien
3. **Server konfigurieren**:
   - Stelle sicher, dass alle URLs zu index.html umgeleitet werden (für React Router)
   - Apache: .htaccess Datei nötig
   - Nginx: Konfiguration für try_files

---

## ⚡ Schnell-Test lokal:

Bevor du deployed, teste die Build-Version lokal:

```bash
npm run build
npm run preview
```

Öffne: http://localhost:4173

---

## 🔧 Wichtige Build-Befehle:

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Production Build erstellen
- `npm run preview` - Build-Version lokal testen

---

## 📝 Checkliste vor dem Deployment:

- [ ] Logo ist im `public` Ordner
- [ ] Alle Bilder sind vorhanden
- [ ] Kontaktdaten sind korrekt (Impressum, Footer)
- [ ] Cookie-Banner funktioniert
- [ ] Alle Links funktionieren
- [ ] Mobile Ansicht getestet
- [ ] Build läuft ohne Fehler (`npm run build`)

---

## 🌐 Domain verbinden:

### Bei Vercel/Netlify:
1. Gehe zu den Projekt-Einstellungen
2. "Domains" → "Add custom domain"
3. Trage deine Domain ein (z.B. `lauffer-gartenbau.de`)
4. Folge den DNS-Anweisungen deines Domain-Anbieters

### DNS Einstellungen (Beispiel):
```
A Record: @ → Vercel/Netlify IP
CNAME: www → deine-app.vercel.app
```

---

## 🆘 Hilfe bei Problemen:

- **Build-Fehler**: Führe `npm run build` lokal aus und prüfe Fehlermeldungen
- **Weiße Seite**: Prüfe Browser-Konsole (F12) für JavaScript-Fehler
- **404 Fehler**: Server-Konfiguration für React Router nötig
- **Bilder fehlen**: Stelle sicher, dass sie im `public` Ordner sind

---

## 💡 Meine Empfehlung:

**Nutze Vercel mit GitHub!**
- Kostenlos
- Automatische Deployments
- Schnell & einfach
- SSL-Zertifikat inklusive
- Optimale Performance

Viel Erfolg! 🎉

