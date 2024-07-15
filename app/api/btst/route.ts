import { NextResponse } from "next/server";
import * as twelveDataFetches from "./fetch";
import { filterStocks } from "./filter";
import { stocks } from "./stockslist";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function processStock(stock: string, filteredStocks: string[]) {
  try {
    const timeSeriesData = await twelveDataFetches.fetchTimeSeriesDaily(stock);
    const smaData = await twelveDataFetches.fetchSMA(stock);
    const bbData = await twelveDataFetches.fetchBollingerBands(stock);
    const rsiData = await twelveDataFetches.fetchRSI(stock);
    const wmaData = await twelveDataFetches.fetchWMA(stock);

    const btst = await filterStocks(
      stock,
      timeSeriesData,
      smaData,
      bbData,
      rsiData,
      wmaData
    );

    if (btst) {
      filteredStocks.push(stock);
    }
  } catch (error) {
    console.error(`Error processing stock ${stock}:`, error);
  }
}

export async function GET() {
  const filteredStocks: string[] = [];

  for (let i = 0; i < stocks.length; i++) {
    await processStock(stocks[i], filteredStocks);

    // Wait for 60 seconds (60000 milliseconds) before processing the next stock
    if (i < stocks.length - 1) {
      await delay(60000);
    }
  }

  try {
    await client.history.create({
      data: {
        stocks: filteredStocks,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    {
      filteredStocks,
    },
    {
      status: 200,
    }
  );
}
