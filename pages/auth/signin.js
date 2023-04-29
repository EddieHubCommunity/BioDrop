import BlankLayout from "@components/layouts/BlankLayout"
import { getServerSession } from "next-auth/next"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { BsGithub } from "react-icons/bs"
import { AiOutlineLock } from "react-icons/ai"


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    // if the user is logged in redirect, (note: don't redirect to the same page otherwise it'll be in a infinite loop)
    if (session) {
        return { redirect: { destination: "/account/statistics" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}


export default function SignIn({ providers }) {

    const handleProviderIcon = (provider_name) => {
        if (provider_name === "GitHub") {
            return <BsGithub className="text-xl" />
        }
        return <AiOutlineLock />
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8">
                <Image
                    width={50}
                    height={50}
                    className="mx-auto h-16 w-auto"
                    src="/logo512.png"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-medium">
                    <span className="text-secondary-medium"> Connect to your audience </span>
                    with a single link
                </h2>
                {Object.values(providers).map((provider) => (
                    <button
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="group relative transition-all flex gap-4 items-center w-full justify-center rounded-md bg-primary-medium p-3 text-sm font-medium text-primary-low hover:bg-primary-medium/90 dark:hover:bg-primary-medium/60 outline-none"
                    >
                        {handleProviderIcon(provider.name)} Continue with {provider.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

SignIn.getLayout = function getLayout(page) {
    return (
        <BlankLayout>
            {page}
        </BlankLayout>
    )
}