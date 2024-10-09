import Image from "next/image";

const DashboardPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod alias
            doloribus impedit.
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
            <Image
              alt="dashboard ipsum"
              src="/dashboard_placeholder.webp"
              className="absolute inset-0 h-full w-full object-cover"
              priority
              fill
            />
          </div>

          <div className="lg:py-8">
            <article className="space-y-4 text-gray-600">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                qui hic atque tenetur quis eius quos ea neque sunt, accusantium
                soluta minus veniam tempora deserunt? Molestiae eius quidem quam
                repellat.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorum explicabo quidem voluptatum voluptas illo accusantium
                ipsam quis, vel mollitia? Vel provident culpa dignissimos
                possimus, perferendis consectetur odit accusantium dolorem amet
                voluptates aliquid, ducimus tempore incidunt quas. Veritatis
                molestias tempora distinctio voluptates sint! Itaque quasi
                corrupti, sequi quo odit illum impedit!
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
