export default interface Profile {
  _id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  url: string | null;
}
