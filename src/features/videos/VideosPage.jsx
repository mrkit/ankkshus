import { useState } from 'react';
import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoChannelsQuery,
  useGetVideosQuery,
} from '../../app/api.js';
import { relativeDate } from '../../lib/dates.js';
import { youtubeId } from './youtube.js';

function AddVideo({ channels, onDone }) {
  const [createVideo, { isLoading, error }] = useCreateVideoMutation();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const channel = form.get('channel');
    const result = await createVideo({
      title: form.get('title'),
      url: form.get('url'),
      videoChannelId: channel ? Number(channel) : null,
    });
    if (!result.error) onDone();
  }

  return (
    <section className="card">
      <form className="video-form" onSubmit={handleSubmit}>
        <h2>Add a video</h2>
        <label className="field">
          <span>Title</span>
          <input
            className="input"
            type="text"
            name="title"
            required
            maxLength={200}
          />
        </label>
        <label className="field">
          <span>YouTube link</span>
          <input
            className="input"
            type="url"
            name="url"
            placeholder="https://youtu.be/…"
            required
          />
        </label>
        {channels.length > 0 && (
          <label className="field">
            <span>Channel</span>
            <select className="input" name="channel" defaultValue="">
              <option value="">None</option>
              {channels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {error && (
          <p className="error" role="alert">
            Could not add that video. Check the link.
          </p>
        )}
        <div className="row">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            Add it
          </button>
          <button type="button" className="btn btn-quiet" onClick={onDone}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export function VideosPage({ user }) {
  const { data: videos = [], isError } = useGetVideosQuery();
  const { data: channels = [] } = useGetVideoChannelsQuery();
  const [deleteVideo] = useDeleteVideoMutation();
  const [adding, setAdding] = useState(false);
  const [channelId, setChannelId] = useState(null);

  const shown = videos.filter(
    (v) => channelId === null || v.videoChannelId === channelId,
  );

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Videos</h1>
          <p className="muted">Things to watch, then talk about.</p>
        </div>
        {!adding && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAdding(true)}
          >
            Add a video
          </button>
        )}
      </div>

      <div className="stack">
        {adding && (
          <AddVideo channels={channels} onDone={() => setAdding(false)} />
        )}

        {channels.length > 0 && (
          <div className="video-tools">
            <div className="chips" role="group" aria-label="Channel">
              <button
                type="button"
                className="chip"
                aria-pressed={channelId === null}
                onClick={() => setChannelId(null)}
              >
                All
              </button>
              {channels.map((c) => (
                <button
                  type="button"
                  className="chip"
                  key={c.id}
                  aria-pressed={channelId === c.id}
                  onClick={() => setChannelId(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {isError && (
          <p className="error" role="alert">
            Could not load the videos.
          </p>
        )}
        {shown.length === 0 && !isError && (
          <section className="card">
            <p className="empty">Nothing in this pile yet.</p>
          </section>
        )}

        <div className="video-grid deal">
          {shown.map((video) => {
            const id = youtubeId(video.url);
            return (
              <article className="card video-tile" key={video.id}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  {id ? (
                    <img
                      src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                      alt=""
                      width="320"
                      height="180"
                      loading="lazy"
                    />
                  ) : (
                    <span className="video-title">{video.title}</span>
                  )}
                </a>
                <a
                  className="video-title"
                  href={video.url}
                  target="_blank"
                  rel="noopener"
                >
                  {video.title}
                </a>
                <div className="video-meta">
                  <span>
                    {video.addedBy ? `added by ${video.addedBy.username}` : ''}
                  </span>
                  <span>{relativeDate(video.createdAt)}</span>
                </div>
                {(video.addedById === user.id || video.addedById === null) && (
                  <button
                    type="button"
                    className="btn-link"
                    style={{ justifySelf: 'start', color: 'var(--danger)' }}
                    onClick={() => {
                      if (window.confirm(`Remove “${video.title}”?`))
                        deleteVideo(video.id);
                    }}
                  >
                    Remove
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
