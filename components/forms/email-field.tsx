export default function EmailField() {
    return (
        <>
            <label className="text-md text-background" htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border border-background mb-4 placeholder-gray-200"
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                autoComplete="email"
                required
            />
        </>
    )
}