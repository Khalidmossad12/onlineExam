// Import the FontAwesome icon and the icon you want to use
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div>
      {/* Use the FontAwesomeIcon component with the icon you imported */}
      <FontAwesomeIcon icon={faHome} className="text-blue-500" />
    </div>
  );
}