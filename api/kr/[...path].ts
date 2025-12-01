// Minimal local types to avoid depending on '@vercel/node' during local builds
type VercelRequest = {
	query: Record<string, string | string[] | undefined>;
};
type VercelResponse = {
	status: (code: number) => VercelResponse;
	setHeader: (name: string, value: string) => void;
	send: (body: string | Buffer | Uint8Array) => void;
	json: (body: unknown) => void;
};

function buildQueryString(req: VercelRequest): string {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(req.query)) {
		if (key === 'path') continue;
		if (Array.isArray(value)) {
			for (const v of value) params.append(key, String(v));
		} else if (value !== undefined) {
			params.append(key, String(value));
		}
	}
	const str = params.toString();
	return str ? `?${str}` : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const token =
		(process.env.RIOT_API_KEY || process.env.VITE_RIOT_API_KEY || '')
			.toString()
			.trim()
			.replace(/^['"]|['"]$/g, '');

	if (!token) {
		return res.status(500).json({ error: 'Missing RIOT_API_KEY' });
	}

	const pathParam = req.query.path;
	const subPath = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam ?? '');
	const query = buildQueryString(req);
	const url = `https://kr.api.riotgames.com/${subPath}${query}`;

	const upstream = await fetch(url, {
		method: 'GET',
		headers: { 'X-Riot-Token': token },
	});

	res.status(upstream.status);
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
	const contentType = upstream.headers.get('content-type');
	if (contentType) res.setHeader('content-type', contentType);

	const bodyText = await upstream.text();
	res.send(bodyText);
}


