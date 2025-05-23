import { useState, useEffect } from 'react';

function SearchResult({ keyword, token }: { keyword: string, token: string }) {
    const [tracks, setTracks] = useState<any[]>([]);
    const [fetched, setFetched] = useState(false);

    // 検索キーワードが変更されたらAPIを呼び出す
    useEffect(() => {
        if (!keyword) {
            setTracks([]);
            setFetched(false);
            return;
        }
        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFetched(true);
            if (data.tracks && data.tracks.items) {
                setTracks(data.tracks.items);
            } else {
                setTracks([]);
            }
        })
        .catch(() => {
            setFetched(true);
            setTracks([]);
        });
    }, [keyword, token]);

    return (
        <div>
            <h2>検索結果</h2>
            <ul id="searchResult">
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <li key={track.id}>
                            {track.name} / {track.artists.map((artist: any) => artist.name).join(', ')}
                        </li>
                    ))
                ) : (
                    fetched && <li>該当する曲がありません</li>
                )}
            </ul>
        </div>
    );
}

export default function AddBtn() {
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const spotifyToken = import.meta.env.VITE_SPOTIFY_TOKEN;

    return(
        <div>
            <button onClick={() => setShowSearch(!showSearch)}>
                {showSearch ? "閉じる" : "＋"}
            </button>

            {showSearch && (
                <div>
                    <input
                        type="text"
                        placeholder="キーワードを入力"
                        className="border p-2 mt-2"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                    <SearchResult keyword={keyword} token={spotifyToken} />
                </div>
            )}
        </div>
    );
}