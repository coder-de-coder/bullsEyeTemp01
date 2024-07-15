import * as twelveDataResponse from "../../../types/twelveDataResponses";

interface timeSeriesDailyResponse
  extends twelveDataResponse.timeSeriesDailyReponse {}
interface smaResponse extends twelveDataResponse.smaResponse {}
interface bollingerBandsResponse
  extends twelveDataResponse.bollingerBandsResponse {}
interface rsiResponse extends twelveDataResponse.rsiResponse {}
interface wmaResponse extends twelveDataResponse.wmaResponse {}

export async function filterStocks(
  stock: string,
  timeSeriesData: timeSeriesDailyResponse["values"][0],
  smaData: smaResponse["values"][0],
  bbData: bollingerBandsResponse["values"][0],
  rsiData: rsiResponse["values"][0],
  wmaData: wmaResponse["values"][0]
): Promise<boolean> {
  if (!timeSeriesData || !smaData || !bbData || !rsiData || !wmaData) {
    console.log(`Missing Data for ${stock}`);
    console.log(timeSeriesData);
    console.log(smaData);
    console.log(bbData);
    console.log(rsiData);
    console.log(wmaData);

    return false;
  }

  if (
    timeSeriesData.volume > smaData.sma &&
    timeSeriesData.close > bbData.upper_band &&
    parseFloat(rsiData.rsi) > 60 &&
    parseFloat(wmaData.wma) > 60
  ) {
    return true;
  } else {
    return true;
  }
}
