// Tipuri de materiale feroase pentru inspecție
export const MATERIAL_TYPES = {
  PLATES: {
    id: 'plates',
    name: 'Plăci de oțel',
    description: 'Plăci plate de oțel pentru construcții și industrie',
    commonThickness: ['6mm', '8mm', '10mm', '12mm', '15mm', '20mm', '25mm', '30mm'],
    commonGrades: ['S235', 'S275', 'S355', 'S420', 'S460']
  },
  SLABS: {
    id: 'slabs',
    name: 'Bramă de oțel',
    description: 'Semifabricate de oțel pentru laminare',
    commonThickness: ['150mm', '200mm', '250mm', '300mm'],
    commonGrades: ['C45', 'C60', '42CrMo4', '34CrNiMo6']
  },
  PIPES: {
    id: 'pipes',
    name: 'Țevi de oțel',
    description: 'Țevi sudate sau fără sudură pentru transport fluide',
    commonDiameters: ['DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50', 'DN80', 'DN100'],
    commonGrades: ['L235', 'L275', 'L360', 'L415', 'L450']
  }
};

// Tipuri de defecte pentru materiale feroase
export const DEFECT_TYPES = {
  SURFACE_CRACKS: {
    id: 'surface_cracks',
    name: 'Fisuri de suprafață',
    severity: ['CRITICAL', 'MAJOR', 'MINOR'],
    description: 'Fisuri vizibile pe suprafața materialului',
    causes: ['Tensiuni interne', 'Tratament termic incorect', 'Coroziune sub tensiune'],
    applicableTo: ['plates', 'slabs', 'pipes']
  },
  CORROSION: {
    id: 'corrosion',
    name: 'Coroziune/Rugină',
    severity: ['CRITICAL', 'MAJOR', 'MINOR'],
    description: 'Oxidarea și deteriorarea suprafeței metalice',
    causes: ['Umiditate', 'Expunere la chimicale', 'Lipsa protecției'],
    applicableTo: ['plates', 'slabs', 'pipes']
  },
  SCALE_OXIDATION: {
    id: 'scale_oxidation',
    name: 'Calamină/Oxidare',
    severity: ['MAJOR', 'MINOR'],
    description: 'Stratul de oxizi format în timpul laminării la cald',
    causes: ['Temperatură excesivă', 'Atmosferă oxidantă'],
    applicableTo: ['plates', 'slabs']
  },
  PITTING: {
    id: 'pitting',
    name: 'Picături/Cavități',
    severity: ['CRITICAL', 'MAJOR', 'MINOR'],
    description: 'Coroziune localizată formând cavități mici',
    causes: ['Coroziune electrochimică', 'Incluziuni', 'Mediu agresiv'],
    applicableTo: ['plates', 'slabs', 'pipes']
  },
  SCRATCHES: {
    id: 'scratches',
    name: 'Zgârieturi/Șanțuri',
    severity: ['MAJOR', 'MINOR'],
    description: 'Deteriorări mecanice de suprafață',
    causes: ['Manipulare incorectă', 'Transport', 'Stocarea necorespunzătoare'],
    applicableTo: ['plates', 'slabs']
  },
  INCLUSIONS: {
    id: 'inclusions',
    name: 'Incluziuni',
    severity: ['CRITICAL', 'MAJOR'],
    description: 'Materiale străine înglobate în matrice',
    causes: ['Curățenie insuficientă', 'Deoxidare incompletă', 'Contaminare'],
    applicableTo: ['plates', 'slabs', 'pipes']
  }
};

// Niveluri de severitate
export const SEVERITY_LEVELS = {
  CRITICAL: {
    level: 'CRITICAL',
    name: 'Critic',
    color: '#dc2626',
    priority: 1,
    action: 'Respingere imediată - Material impropriu pentru utilizare'
  },
  MAJOR: {
    level: 'MAJOR',
    name: 'Major',
    color: '#f59e0b',
    priority: 2,
    action: 'Investigare detaliată - Posibil acceptabil cu restricții'
  },
  MINOR: {
    level: 'MINOR',
    name: 'Minor',
    color: '#10b981',
    priority: 3,
    action: 'Monitorizare - În general acceptabil'
  }
};