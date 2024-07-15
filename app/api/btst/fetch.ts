import axios from "axios";
import * as twelveDataResponse from "../../../types/twelveDataResponses";

const apikey = process.env.TWELVEDATA_API;

export const fetchTimeSeriesDaily = async (
  symbol: string
): Promise<twelveDataResponse.timeSeriesDailyReponse["values"][0]> => {
  try {
    const response = await axios.get<twelveDataResponse.timeSeriesDailyReponse>(
      `https://api.twelvedata.com/time_series`,
      {
        params: {
          symbol,
          interval: "15min",
          apikey,
        },
      }
    );
    console.log(response.data.values[0]);
    return response.data.values[0];
  } catch (error) {
    console.error(
      `Error fetching time series daily data for ${symbol}:`,
      error
    );
    throw new Error("Failed to fetch time series daily data");
  }
};

export const fetchSMA = async (
  symbol: string
): Promise<twelveDataResponse.smaResponse["values"][0]> => {
  try {
    const response = await axios.get<twelveDataResponse.smaResponse>(
      `https://api.twelvedata.com/sma`,
      {
        params: {
          symbol,
          interval: "15min",
          apikey,
        },
      }
    );
    return response.data.values[0];
  } catch (error) {
    console.error(`Error fetching SMA data for ${symbol}:`, error);
    throw new Error("Failed to fetch SMA data");
  }
};

export const fetchBollingerBands = async (
  symbol: string
): Promise<twelveDataResponse.bollingerBandsResponse["values"][0]> => {
  try {
    const response = await axios.get<twelveDataResponse.bollingerBandsResponse>(
      `https://api.twelvedata.com/bbands`,
      {
        params: {
          symbol,
          interval: "15min",
          apikey,
        },
      }
    );
    return response.data.values[0];
  } catch (error) {
    console.error(`Error fetching Bollinger Bands data for ${symbol}:`, error);
    throw new Error("Failed to fetch Bollinger Bands data");
  }
};

export const fetchRSI = async (
  symbol: string
): Promise<twelveDataResponse.rsiResponse["values"][0]> => {
  try {
    const response = await axios.get<twelveDataResponse.rsiResponse>(
      `https://api.twelvedata.com/rsi`,
      {
        params: {
          symbol,
          interval: "15min",
          apikey,
        },
      }
    );
    return response.data.values[0];
  } catch (error) {
    console.error(`Error fetching RSI data for ${symbol}:`, error);
    throw new Error("Failed to fetch RSI data");
  }
};

export const fetchWMA = async (
  symbol: string
): Promise<twelveDataResponse.wmaResponse["values"][0]> => {
  try {
    const response = await axios.get<twelveDataResponse.wmaResponse>(
      `https://api.twelvedata.com/wma`,
      {
        params: {
          symbol,
          interval: "15min",
          apikey,
        },
      }
    );
    return response.data.values[0];
  } catch (error) {
    console.error(`Error fetching WMA data for ${symbol}:`, error);
    throw new Error("Failed to fetch WMA data");
  }
};
