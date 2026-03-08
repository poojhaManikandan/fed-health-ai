export interface Model {
    id: string;
    name: string;
    disease: string;
    description: string;
    accuracy: number;
    hospitalsUsing: number;
    version: string;
    category: string;
    tags: string[];
    dataPoints: number;
    lastUpdated: string;
    reviews: Review[];
    trainingHistory: TrainingPoint[];
    features: string[];
    inputFormat: string;
    outputFormat: string;
    sizeKB: number;
}

export interface Review {
    id: string;
    hospital: string;
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
}

export interface TrainingPoint {
    round: number;
    accuracy: number;
    hospitals: number;
}

export const mockModels: Model[] = [
    {
        id: '1',
        name: 'Huntington-GeneNet',
        disease: "Huntington's Disease",
        description: 'Federated model for early-stage Huntington\'s Disease detection using genetic marker analysis and CAG repeat profiling across neurology centres.',
        accuracy: 91.8,
        hospitalsUsing: 10,
        version: '1.3.0',
        category: 'Genetic',
        tags: ['Genetic', 'Early-Detection', 'PyTorch'],
        dataPoints: 18700,
        lastUpdated: '2026-02-20',
        sizeKB: 2800,
        inputFormat: 'CSV (CAG repeats, genetic markers, neurology scores)',
        outputFormat: 'JSON (hd_risk_score, onset_estimate)',
        features: ['CAG repeat length analysis', 'Neurological decline tracking', 'Family history weighting'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 80.0, hospitals: 3 }, { round: 7, accuracy: 91.8, hospitals: 10 }],
    },
    {
        id: '2',
        name: 'CKD-Risk-Sys',
        disease: 'Chronic Kidney Disease',
        description: 'Predictive model for CKD progression using patient vitals and blood work panels.',
        accuracy: 91.5,
        hospitalsUsing: 18,
        version: '2.1.0',
        category: 'Nephrology',
        tags: ['Renal', 'Early-Stage'],
        dataPoints: 45000,
        lastUpdated: '2026-01-20',
        sizeKB: 1800,
        inputFormat: 'CSV (serum creatinine, BUN, BP)',
        outputFormat: 'JSON (ckd_stage, progression_risk)',
        features: ['GFR estimation', 'Proteinuria correlation', 'Hypertension weighting'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 82.5, hospitals: 5 }, { round: 10, accuracy: 91.5, hospitals: 18 }],
    },
    {
        id: '3',
        name: 'Breast-OncoScreen',
        disease: 'Breast Cancer',
        description: 'Advanced tumor classification using histopathological feature extraction and mammography metadata.',
        accuracy: 95.8,
        hospitalsUsing: 25,
        version: '3.0.1',
        category: 'Oncology',
        tags: ['Validated', 'High-Priority'],
        dataPoints: 68000,
        lastUpdated: '2026-02-28',
        sizeKB: 4100,
        inputFormat: 'CSV (tumor radius, texture, perimeter)',
        outputFormat: 'JSON (malignancy_probability, diagnosis)',
        features: ['Cell nuclei morphological analysis', 'Tumor texture evaluation', 'Concavity measurement'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 85.0, hospitals: 10 }, { round: 15, accuracy: 95.8, hospitals: 25 }],
    },
    {
        id: '4',
        name: 'Parkinson-GaitNet',
        disease: 'Parkinson\'s Disease',
        description: 'Early detection of Parkinson\'s using vocal biomarkers and tremor measurement data.',
        accuracy: 88.4,
        hospitalsUsing: 14,
        version: '1.4.0',
        category: 'Neurological',
        tags: ['Early-Detection', 'Audio-Vocal'],
        dataPoints: 12000,
        lastUpdated: '2025-11-10',
        sizeKB: 2500,
        inputFormat: 'CSV (vocal frequencies, tremor amplitude)',
        outputFormat: 'JSON (pd_probability, updrs_score_estimate)',
        features: ['Vocal jitter/shimmer analysis', 'Tremor frequency tracking'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 75.0, hospitals: 3 }, { round: 8, accuracy: 88.4, hospitals: 14 }],
    },
    {
        id: '5',
        name: 'ALS-Progression-AI',
        disease: 'ALS (Lou Gehrig\'s)',
        description: 'Predicts disease progression rate in Amyotrophic Lateral Sclerosis patients.',
        accuracy: 86.7,
        hospitalsUsing: 9,
        version: '1.1.0',
        category: 'Neurological',
        tags: ['Rare', 'Progression-Tracking'],
        dataPoints: 8500,
        lastUpdated: '2025-12-05',
        sizeKB: 1400,
        inputFormat: 'CSV (clinical assessments, respiratory function)',
        outputFormat: 'JSON (progression_rate, survival_estimate)',
        features: ['Respiratory decline modeling', 'Bulbar function tracking'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 70.2, hospitals: 2 }, { round: 6, accuracy: 86.7, hospitals: 9 }],
    },
    {
        id: '6',
        name: 'Cirrhosis-Survive',
        disease: 'Liver Cirrhosis',
        description: 'Predicts survival outcomes and complication risks for staging liver cirrhosis.',
        accuracy: 89.3,
        hospitalsUsing: 22,
        version: '1.8.5',
        category: 'Hepatology',
        tags: ['Survival-Analysis', 'Gastrointestinal'],
        dataPoints: 34000,
        lastUpdated: '2026-02-10',
        sizeKB: 2100,
        inputFormat: 'CSV (bilirubin, albumin, prothrombin time)',
        outputFormat: 'JSON (survival_probability, decompensation_risk)',
        features: ['MELD score correlation', 'Ascites impact modeling'],
        reviews: [],
        trainingHistory: [{ round: 1, accuracy: 78.5, hospitals: 6 }, { round: 12, accuracy: 89.3, hospitals: 22 }],
    }
];
