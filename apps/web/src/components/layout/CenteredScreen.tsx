export default function CenteredScreen({ children, maxWidth = 480 }: { children: React.ReactNode, maxWidth?: number }) {
    return (
        <div className="min-h-screen dotted-bg flex items-start justify-center overflow-y-auto py-12 px-6">
            <div style={{ width: '100%', maxWidth }}>
                {children}
            </div>
        </div>
    )
}
