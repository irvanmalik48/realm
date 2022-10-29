import { GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import PostCard from "../../components/stateless/PostCard";
import { getPostSlugs } from "../../utils/utils";

const slug = {
  title: "Posts",
  description: "IrvanMA's shitposting stash.",
};

export default function Blog(props: any) {
  return (
    <BaseLayout {...slug}>
      <section className="w-full min-h-screen grid place-content-center place-items-center gap-5 py-24 container-responsive">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <section className="min-h-full px-5 py-2 flex flex-col items-center justify-center gap-3">
            <p className="w-fit text-3xl font-bold border-b-2 border-red-400 border-opacity-50">
              Blog Posts
            </p>
            <p>Everything that I&apos;ve written.</p>
          </section>
        </div>
        <div className="grid md:grid-cols-2 gap-5 w-full">
          {props.posts.map((post: any, index: any) => (
            <PostCard key={index} meta={post} />
          ))}
        </div>
      </section>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postSlugs = getPostSlugs().sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    props: {
      posts: postSlugs,
    },
  };
};
