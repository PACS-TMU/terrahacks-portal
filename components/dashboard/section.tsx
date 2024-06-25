export default function Section({ decision, blurb }: { decision: string, blurb: string }) {
    return (
        <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 px-6 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">
            <div className="text-left">
                <p className="md:text-xl whitespace-pre-line my-2">
                    {decision}
                </p>
                <p className="md:text-xl whitespace-pre-line my-2">
                    {blurb}
                </p>
                <p className="md:text-xl whitespace-pre-line my-2">
                    For any questions, please contact us at {" "}
                    <a
                        aria-label="Email us"
                        href="mailto:contact@terrahacks.ca"
                        className="underline font-semibold text-background duration-300 ease-in-out hover:text-sky-400"
                    >
                        contact@terrahacks.ca
                    </a>.
                </p>
            </div>
        </div>
    );
}