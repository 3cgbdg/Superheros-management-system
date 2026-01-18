'use client';


interface HeroInfoSectionProps {
    nickname: string;
    realName: string;
    catchPhrase: string;
    description: string;
}

export default function HeroInfoSection({ nickname, realName, catchPhrase, description }: HeroInfoSectionProps) {
    return (
        <>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">Nickname</span>
            <h2 className="text-4xl font-black text-blue-600 mb-6 break-words overflow-hidden">{nickname}</h2>

            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">Real Name</span>
            <p className="text-xl text-gray-800 mb-6 font-semibold">{realName}</p>

            <div className="mb-8">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-2">Catch Phrase</span>
                <p className="italic text-gray-700 text-xl border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                    "{catchPhrase}"
                </p>
            </div>

            <div className="mb-8">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-2">Description</span>
                <p className="text-gray-700 leading-relaxed text-lg">
                    {description}
                </p>
            </div>
        </>
    );
}
