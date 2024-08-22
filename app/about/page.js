function Page(){
    return (
                <Image
                    src={about1}
                    alt="Family sitting around a fire pit in front of cabin"
                />
            </div>

            {/* What to do if can't statically import image and don't want to set width and height */}
            <div className="col-span-2 relative  aspect-square">
                <Image 
                src="/about-2.jpg" 
                alt="Family that manages The Wild Oasis"
                fill
                className="object-cover object-center"
                />
            </div>
        </div>
    );
}
export default Page;