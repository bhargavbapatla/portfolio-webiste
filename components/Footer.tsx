"use client";

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0e1620] px-8 pt-32 pb-12 font-mono text-sm text-[#888] border-t border-white/5">

            {/* ── Abstract ASCII Background Element ── */}
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[6px] leading-[6px] text-[#ff3333] opacity-[0.15] select-none md:text-[8px] md:leading-[8px]">
                {`
          > SYSTEM.WAKE_LOCK()
          > ALLOCATING_MEMORY...
          ~ / j \\ ? ? _ ~ - i
          < | Z L O N C U Y { [ ? ] \\ i ? : ' l
        > Y X V U x [ ? ~ l f x \\ \\ ] Y Z C r t l !  > ? ~
        n x X O N L Y   3   S P O T S   L E F T m z j / x Z Z L n n u \\ ) - ;
        j f t ( + !             ) U 8 z c t / O p O C r z O X f ) \\
        l [ [ l , ^               c U n Z U / r C C j ( j c m Z f + -
        } ? + i : '               ) r Q O Z v [ f } . : ; j u O Q r } > j
        [ _ ~ ;                   ( } \\ O m 8 n i } '   | ( _ X n x r r \\ : '
        < \` ;                       / ] f X L 8 Z n         j ;   i / X x l
        ^                           l - - | x L Z L ?                 , i \\ !
                                      l _ [ \` C O X [                   [ | f
        `}
            </div>

            {/* ── Main Layout: Stripped down to essentials ── */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 md:flex-row md:items-start">

                {/* Left: Terminal Status */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-white text-base font-medium">
                        <div className="h-2 w-2 bg-[#ff3333] shadow-[0_0_10px_#ff3333] animate-pulse" />
                        Ready to deploy.
                    </div>
                    <p className="pl-5 text-xs tracking-widest text-[#555]">
                        System nominal.
                    </p>
                </div>

                {/* Right: Contact */}
                <div className="flex flex-col text-left md:text-right">
                    <a
                        href="mailto:bhargav.bapatla20@gmail.com"
                        className="text-white text-sm tracking-widest transition-colors hover:text-[#ff3333]"
                    >
                        bhargav.bapatla20@gmail.com
                    </a>
                </div>

            </div>

            {/* ── Center Copyright ── */}
            <div className="relative z-10 mx-auto mt-40 mb-8 flex flex-col items-center justify-center gap-1 text-center text-xs tracking-widest text-[#555]">
                <p>© {new Date().getFullYear()}</p>
                <p>Krishnabhargav Bapatla.</p>
                <p>Let the engineer handle it.</p>
            </div>

            {/* ── Giant Clipped Background Text ── */}
            <div className="pointer-events-none absolute bottom-0 left-0 flex w-full justify-center overflow-hidden select-none">
                <h1
                    className="font-display font-black leading-[0.75] text-white/[0.02]"
                    style={{
                        fontSize: "24vw",
                        marginBottom: "-4.5vw", // Perfectly sinks the text into the floor 
                    }}
                >
                    BHARGAV
                </h1>
            </div>

        </footer>
    );
}