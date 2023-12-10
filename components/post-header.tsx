// Import necessary modules and components
import BackButton from './back-button';
import DetailHeader from './detail-header';

export default function TweetHeader() {
  return (
    <DetailHeader>
      <div className="flex items-center">
        <BackButton />
        <h1 className="my-0 ml-2 text-3xl font-semibold leading-tight text-blue-600">
          Post
        </h1>
      </div>
    </DetailHeader>
  );
}
