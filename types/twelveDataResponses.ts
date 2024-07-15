export interface timeSeriesDailyReponse {
    "meta": {
        "symbol": string,
        "interval": string,
        "currency": string,
        "exchange_timezone": string,
        "exchange": string,
        "mic_code": string,
        "type": string
    },
    "values": [{
        "datetime": string,
        "open": string,
        "high": string,
        "low": string,
        "close": string,
        "volume": string
    }]
}

export interface smaResponse {
    "meta": {
        "symbol": string
        "interval": string,
        "currency": string,
        "exchange_timezone": string,
        "exchange": string,
        "mic_code": string,
        "type": string,
        "indicator": {
            "name": string,
            "series_type": string,
            "time_period": number
        }
    },
    "values": [
        {
            "datetime": string,
            "sma": string
        }
    ],
    "status": string
}

export interface bollingerBandsResponse {
    "meta": {
        "symbol": string,
        "interval": string,
        "currency": string,
        "exchange_timezone": string,
        "exchange": string,
        "mic_code": string,
        "type": string,
        "indicator": {
            "name": string,
            "ma_type": string,
            "sd": number,
            "series_type": string,
            "time_period": number
        }
    },
    "values": [
        {
            "datetime": string,
            "upper_band": string,
            "middle_band": string,
            "lower_band": string
        }
    ],
    "status": string
}

export interface rsiResponse {
    "meta": {
        "symbol": string,
        "interval": string,
        "currency": string,
        "exchange_timezone": string,
        "exchange": string,
        "mic_code": string,
        "type": string,
        "indicator": {
            "name": string,
            "series_type": string,
            "time_period": number
        }
    },
    "values": [
        {
            "datetime": string,
            "rsi": string
        }
    ],
    "status": string
}

export interface wmaResponse {
    "meta": {
        "symbol": string,
        "interval": string,
        "currency": string,
        "exchange_timezone": string,
        "exchange": string,
        "mic_code": string,
        "type": string,
        "indicator": {
            "name": string,
            "series_type": string,
            "time_period": number
        }
    },
    "values": [
        {
            "datetime": string,
            "wma": string
        }],
    "status": string
}