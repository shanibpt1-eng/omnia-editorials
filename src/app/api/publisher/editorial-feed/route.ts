import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get('search') || '').toLowerCase().trim();
    const country = (searchParams.get('country') || 'all').toLowerCase().trim();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '25', 10);

    const indexPath = path.join(process.cwd(), 'public', 'editorial-index.json');
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ total: 0, items: [], countries: [] });
    }

    const raw = fs.readFileSync(indexPath, 'utf-8');
    const allItems: any[] = JSON.parse(raw);

    // Extract unique countries
    const countrySet = new Set<string>();
    allItems.forEach((i) => {
      if (i.country) countrySet.add(i.country.toUpperCase());
    });
    const countries = Array.from(countrySet).sort();

    // Filter
    const filtered = allItems.filter((item) => {
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.file.toLowerCase().includes(search) ||
        item.country.toLowerCase().includes(search);

      const matchCountry =
        country === 'all' || item.country.toLowerCase() === country;

      return matchSearch && matchCountry;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return NextResponse.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      countries,
      items,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
