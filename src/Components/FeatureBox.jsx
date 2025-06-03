import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function FeatureBox(props) {
  const [animate] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const handleExternalLink = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(props.link)}`);
      return;
    }
    if (props.onClick) props.onClick();
    window.open(props.link, '_blank');
  };
  

  const handleShare = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await navigator.clipboard.writeText(props.link);
      alert('Link copied to clipboard!');
      if (navigator.share) {
        await navigator.share({
          title: props.title,
          text: props.text,
          url: props.link,
        });
      }
    } catch (err) {
      alert('Failed to copy the link.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center max-w-full mb-8 font-nunito">
      <div
        className={`bg-white border-2 border-gray rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg m-4 transform ${animate ? 'animate-pop' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-full h-48 flex items-center justify-center">
            <img
              src={props.image}
              alt={props.title}
              className="object-contain w-3/4 h-full p-2"
            />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-3xl font-extrabold text-black">{props.title}</h2>
            <p className="text-lg text-gray-700">{props.text}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleExternalLink}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              >
                Install
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15s-.767.966-.94 1.164c-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.075-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pop {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .animate-pop {
            animation: pop 1s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default FeatureBox;






// import React, { useState } from 'react';

// function FeatureBox(props) {
//   const [animate] = useState(true); // Set to true for infinite animation

//   const handleExternalLink = () => {
//     if (props.onClick) {
//       props.onClick();
//     }
//     window.open(props.link, '_blank');
//   };

//   return (
//     <div className="flex flex-wrap justify-center max-w-full mb-8 font-nunito">
//       <div
//         className={`bg-white border-2 border-gray rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg m-4 transform ${animate ? 'animate-pop' : ''}`}
//         onClick={handleExternalLink}
//         style={{ cursor: 'pointer' }}
//       >
//         <div className="flex flex-col items-center">
//           <div className="relative w-full h-48 flex items-center justify-center">
//             <img
//               src={props.image}
//               alt={props.title} // Use title as alt for meaningful description
//               className="object-contain w-3/4 h-full p-2"
//             />
//           </div>
//           <div className="p-4 text-center">
//             <h2 className="text-3xl font-extrabold text-black">{props.title}</h2>
//             <p className="text-lg text-gray-700">{props.text}</p>
//             <button
//               onClick={handleExternalLink}
//               className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Install
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes pop {
//             0%, 100% {
//               transform: scale(1);
//             }
//             50% {
//               transform: scale(1.1);
//             }
//           }

//           .animate-pop {
//             animation: pop 1s infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default FeatureBox;