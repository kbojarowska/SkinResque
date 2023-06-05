def skinTypeRecommendation(info):
    keywords = ["oily", "mattify", "damaged", "deep-cleansing", "deep cleansing", "moisturizing", "moisturize"]
    recommendation = []
    for keyword in keywords:
        if keyword in info:
            if keyword in ["oily", "mattify", "deep-cleansing", "deep cleansing"]:
                recommendation.append('oily')
            if keyword in ["moisturizing", "moisturize"]:
                recommendation.append('dry')
            if len(recommendation) > 1:
                recommendation.append('mixed')
    recommendation.append('normal')
    return recommendation
