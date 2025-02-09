export default function Hero() {
    return (
        <div className="flex justify-center mt-8">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfypppdaAjCCQ4YT-64IwVyKscuQCVRyAzjPOJoYWQSV3WJBg/viewform?usp=sharing" target="_blank">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-2xl font-semibold text-white backdrop-blur-3xl">
                        Order Now
                    </span>
                </button>
            </a>

            {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-2xl font-semibold text-white backdrop-blur-3xl">
                    Order Now
                </span>
            </button> */}
        </div>
    );
}