import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoChannelsQuery,
  useGetVideosQuery,
  useMeQuery,
  useUpdateVideoMutation,
} from '../../app/api.js';

// Accepts youtu.be and youtube.com/watch?v= links. Returns null for anything else.
export function youtubeId(url) {
  const match = /(?:youtu\.be\/|[?&]v=)([\w-]{6,})/.exec(url);
  return match ? match[1] : null;
}

function VideoForm({ onDone }) {
  const [createVideo, { isLoading, error }] = useCreateVideoMutation();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await createVideo({
      title: form.get('title'),
      url: form.get('url'),
    });
    if (!result.error) onDone();
  }

  return (
    <aside>
      <button type="button" onClick={onDone} aria-label="Close">
        X
      </button>
      <form className="messageBoxComponent" onSubmit={handleSubmit}>
        <h3>Add new video</h3>
        <input type="text" name="title" placeholder="Title" required />
        <input type="url" name="url" placeholder="Youtube Url" required />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
        {error && <p role="alert">Could not add that video. Check the URL.</p>}
      </form>
    </aside>
  );
}

function EditVideoForm({ video, onDone }) {
  const [updateVideo, updateState] = useUpdateVideoMutation();
  const [deleteVideo, deleteState] = useDeleteVideoMutation();
  const [wantsDelete, setWantsDelete] = useState(false);
  const [rename, setRename] = useState('');
  const busy = updateState.isLoading || deleteState.isLoading;

  async function handleSubmit(event) {
    event.preventDefault();
    if (wantsDelete) {
      const result = await deleteVideo(video.id);
      if (!result.error) onDone();
      return;
    }
    const title = rename.trim();
    if (!title) return onDone();
    const result = await updateVideo({ id: video.id, title });
    if (!result.error) onDone();
  }

  return (
    <aside>
      <button type="button" onClick={onDone} aria-label="Close">
        X
      </button>
      <form className="messageBoxComponent" onSubmit={handleSubmit}>
        <h3>Edit video</h3>
        <p>Do you want to delete this video?</p>
        <label>
          <input
            type="radio"
            name="delete"
            value="no"
            checked={!wantsDelete}
            onChange={() => setWantsDelete(false)}
          />
          <span>No</span>
        </label>
        <label>
          <input
            type="radio"
            name="delete"
            value="yes"
            checked={wantsDelete}
            onChange={() => setWantsDelete(true)}
          />
          <span>Yes</span>
        </label>
        <label>
          <input
            type="text"
            name="rename"
            value={rename}
            onChange={(e) => setRename(e.target.value)}
            placeholder={`Rename: "${video.title}"`}
            disabled={wantsDelete}
          />
        </label>
        <button type="submit" disabled={busy}>
          Submit
        </button>
      </form>
    </aside>
  );
}

export function VideosPage() {
  const { data: me } = useMeQuery();
  const { data: videos = [], isError } = useGetVideosQuery();
  const { data: channels = [] } = useGetVideoChannelsQuery();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [reversed, setReversed] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const signedIn = Boolean(me?.user);

  const shown = videos
    .filter((video) => channelId === null || video.videoChannelId === channelId)
    .slice()
    .sort((a, b) => (reversed ? b.id - a.id : a.id - b.id));

  return (
    <section className="video-container">
      <h1>Videos</h1>
      <p>Double click on an episode title to Edit or Delete a video.</p>

      <nav className="video-nav">
        <h2 className="video-nav-title">Videos</h2>
        <ul className="video-nav-video-list">
          <li>
            <button
              type="button"
              className="link-button"
              onClick={() => setChannelId(null)}
            >
              All
            </button>
          </li>
          {channels.map((channel) => (
            <li key={channel.id}>
              <button
                type="button"
                className="link-button"
                onClick={() => setChannelId(channel.id)}
              >
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="video-nav-buttons">
          {signedIn ? (
            <button type="button" onClick={() => setShowAdd(true)}>
              Add New Video
            </button>
          ) : (
            <Link to="/login">Log in to add videos</Link>
          )}
          <button type="button" onClick={() => setReversed((r) => !r)}>
            Reverse Order
          </button>
        </div>
      </nav>

      <section className="ccSection">
        {showAdd && <VideoForm onDone={() => setShowAdd(false)} />}
        {editing && (
          <EditVideoForm video={editing} onDone={() => setEditing(null)} />
        )}

        {isError && <p role="alert">Could not load videos.</p>}

        <ul className="video-container-ul">
          {shown.map((video) => {
            const id = youtubeId(video.url);
            return (
              <li key={video.id} className="video-container-ul-li">
                <a target="_blank" rel="noopener" href={video.url}>
                  {id ? (
                    <img
                      src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                      alt={video.title}
                    />
                  ) : (
                    video.title
                  )}
                </a>
                <h3
                  onDoubleClick={() => signedIn && setEditing(video)}
                  title={signedIn ? 'Double click to edit' : undefined}
                >
                  {video.title}
                </h3>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
