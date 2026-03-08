MODEL_PATHS = {

    "skin_cancer": r"D:\Fed_PSG\saved_models\skin.pt",
    "ckd": r"D:\Fed_PSG\saved_models\ckd_chronic_kidney_xgb.model.json",
    "als": r"D:\Fed_PSG\saved_models\ALS_als_model.json",
    "cirrhosis": r"D:\Fed_PSG\saved_models\cirrhosis_model.json",
    "gene": r"D:\Fed_PSG\saved_models\model.pt",
    "huntington": r"D:\Fed_PSG\saved_models\Huntington_huntington_model.json",
    "parkinsons": r"D:\Fed_PSG\saved_models\parkinsons_model.json",
    "pbc": r"D:\Fed_PSG\saved_models\pbc_model.json",
    "wilson": r"D:\Fed_PSG\saved_models\WD_wilson's_disease_xgb_model.json",
    "breast_cancer": r"D:\Fed_PSG\saved_models\WDBC_breast_cancer_model.json"
}


def select_model(disease):

    if disease in MODEL_PATHS:
        return MODEL_PATHS[disease]

    raise ValueError("Disease model not supported")