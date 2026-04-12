import ContactForm from "../components/ContactForm";
import FriendCard from "../components/FriendCard";
import { friends } from "../data/mockItems";
import "./ProfilePage.css";

function ProfilePage() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="profile-page-shell">
      <main className="profile-page">
        <section className="panel profile-card">
          <div className="profile-left">
            <img
              src={`${base}assets/profile/radiant-smile-profile.png`}
              alt="Sasha Jordan"
              className="profile-photo"
            />

            <div className="profile-copy">
              <h1>Sasha Jordan</h1>
              <div className="handle">@BookishInBloom</div>
              <p>
                Book lover, rom-com enthusiast, searching for my next great
                read.
              </p>
            </div>
          </div>

          <button className="edit-profile-btn" type="button">
            Edit Profile
          </button>
        </section>

        <section className="middle-row">
          <aside className="panel friends-card">
            <h2>Friends</h2>
            {friends.map((friend) => (
              <FriendCard key={friend.handle} {...friend} />
            ))}
          </aside>

          <section className="panel clubs-card">
            <h2>Reading Clubs</h2>

            <div className="clubs-layout">
              <div className="club-book">
                <img
                  src={`${base}assets/profile/club1.png`}
                  alt="Romance Reads Club"
                />
              </div>

              <div className="club-book">
                <img
                  src={`${base}assets/profile/club2.png`}
                  alt="Mystery and Thriller Society"
                />
              </div>

              <div className="add-group">
                <span>Add New Group</span>
                <button
                  className="add-btn-large"
                  type="button"
                  aria-label="Add new group"
                >
                  +
                </button>
              </div>
            </div>
          </section>
        </section>

        <section className="contact-section panel">
          <div className="contact-copy">
            <p className="eyebrow">Contact Me</p>
            <h2>Send a note to the ShelfSpace team</h2>
            <p>
              Have a recommendation, a book club idea, or feedback about the
              site? This React form submits in place so the user never gets
              sent away from the design.
            </p>
          </div>

          <ContactForm />
        </section>

        <section className="panel chat-card">
          <div className="chat-header">
            <div className="chat-title">Chat</div>
            <div className="chat-group-name">Fantasy &amp; Fables Guild</div>
          </div>

          <div className="chat-body">
            <div className="message-row row-left first-row">
              <div className="user-icon">U</div>
              <div className="bubble bubble-purple">
                Hey Everyone! How&apos;s your reading going? Any recommendations?
              </div>
            </div>

            <div className="message-row row-left second-row">
              <div className="user-icon">U</div>

              <div className="message-with-book">
                <div className="bubble bubble-orange">
                  Hey Guys! Just finished reading Children of Blood and Bone by
                  Tomi Adeyemi. It&apos;s a dazzling, fast-paced fantasy where
                  magic, oppression, love, and rebellion ignite unforgettable
                  change.
                </div>

                <img
                  src={`${base}assets/profile/book1.png`}
                  alt="Children of Blood and Bone"
                  className="inline-book top-book"
                />
              </div>
            </div>

            <div className="message-row row-right third-row">
              <div className="message-with-book reverse">
                <img
                  src={`${base}assets/profile/book2.jpg`}
                  alt="The Priory of the Orange Tree"
                  className="inline-book bottom-book"
                />

                <div className="bubble bubble-blue">
                  Finished Children of Blood and Bone last week. 10/10 read.
                  Would also suggest the Priory of the Orange Tree.
                </div>
              </div>

              <div className="user-icon">U</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
