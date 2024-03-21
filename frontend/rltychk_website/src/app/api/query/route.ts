// fetches the climate score data through post get to api to vercel postgres
"use server"
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const county = searchParams.get('county');
  const state = searchParams.get('state');
 
  if (!county || !state) {
    return NextResponse.json({ error: 'County and state parameters are required' }, { status: 400 }); // 400 error req
  }

  // sql logic here to find the data needed
  try {
    const result = await sql`
      SELECT * FROM climate_score
      WHERE county = ${county} AND state = ${state};
    `;
    const climateScores = result.rows;
    return NextResponse.json({ climateScores }, { status: 200 }); //200 response okay
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 }); // 500 error cant fulfull
  }
}
