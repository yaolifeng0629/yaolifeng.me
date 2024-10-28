export default function RSS() {
    return (
        <a
            href="/api/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:font-semibold hover:text-primary"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
            </svg>
            RSS
        </a>
    )
}
