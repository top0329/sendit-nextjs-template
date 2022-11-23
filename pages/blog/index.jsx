import { writeFile } from 'fs/promises';
import DefaultLayout from '../../components/layouts/default';
import Filer from '@cloudcannon/filer';
import PostSummary from '../../components/posts/summary';
import { generateRss } from '../../lib/rss';

const filer = new Filer({ path: 'content' });

function PrivacyPage({ page, posts }) {
  return (
    <DefaultLayout page={page}>
      <section class="blog-hero pt-xl-22 pt-sm-20 pt-18 pb-xxl-25 pb-xl-23 pb-22 position-relative">
        <div class="container">
            <div class="row">
              <div class="col-xl-8 col-lg-10 mx-auto">
                  <div class="blog-hero-content">
                    <h1 class="blog-hero-title">{page.data.title}</h1>
                    <p>{page.data.description}</p>
                  </div>
              </div>
            </div>
        </div>
      </section>
      <section class="blog @@padding @@blog-two">
        <div class="container">
            <div class="row">
              { posts.map((post, i) => (
                <PostSummary post={post}  key={i} />
              ))}
              {/* {{ range (.Paginator 9).Pages }}
              
              {{ end }}  */}
              {/* {{ if gt .Paginator.TotalPages 1 }}
              <nav class="blog-pagination">
                  <ul class="pagination">
                    {{ if .Paginator.HasPrev }}
                    <li class="page-item">
                        <a class="page-link btn btn-secondary" href="{{.Paginator.Prev.URL}}">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20.657"
                              height="11.314"
                              viewBox="0 0 20.657 11.314"
                              style="transform: scale(-1, 1)"
                          >
                              <g fill="#fff" data-name="Group 12">
                                <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400"></path>
                                <path
                                    d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z"
                                    data-name="Rectangle 2401"
                                ></path>
                                <path
                                    d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z"
                                    data-name="Rectangle 2402"
                                ></path>
                              </g>
                          </svg>
                        </a>
                    </li>
                    {{ end }} {{ $paginator := .Paginator }} {{ range $paginator.Pagers }}
                    <li class="page-item">
                        <a
                          class="page-link btn btn-secondary {{ if eq . $paginator }}active{{ end }}"
                          href="{{.URL}}"
                          >{{.PageNumber}}</a
                        >
                    </li>
                    {{ end }} {{ if .Paginator.HasNext }}

                    <li class="page-item">
                        <a class="page-link btn btn-secondary" href="{{ .Paginator.Next.URL }}">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20.657"
                              height="11.314"
                              viewBox="0 0 20.657 11.314"
                          >
                              <g fill="#fff" data-name="Group 12">
                                <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400"></path>
                                <path
                                    d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z"
                                    data-name="Rectangle 2401"
                                ></path>
                                <path
                                    d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z"
                                    data-name="Rectangle 2402"
                                ></path>
                              </g>
                          </svg>
                        </a>
                    </li>

                    {{ end }}
                  </ul>
              </nav>
              {{end}} */}
            </div>
        </div>
      </section>

    </DefaultLayout>
  )
}

export default PrivacyPage

export async function getStaticProps({ params }) {
  const page = await filer.getItem('blog.md', { folder: 'pages' });
  const posts = await filer.getItems('posts', { excerpt: true, sortKey: 'date' });
	
  await writeFile('./public/feed.xml', generateRss(posts));

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
}
