import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Pause, Volume2, VolumeX, Info } from "lucide-react";

interface PharaohData {
  id: string;
  name: string;
  dynasty: string;
  period: string;
  reign: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  achievements: string[];
}

const KnowMe = () => {
  const [selectedPharaoh, setSelectedPharaoh] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const pharaohs: PharaohData[] = [
      {
    "id": "nefertiti",
    "name": "Nefertiti",
    "dynasty": "18th Dynasty",
    "period": "New Kingdom",
    "reign": "c. 1353–1336 BC",
    "videoUrl": "Nefertiti.mp4",
    "thumbnailUrl": "nefertiti.jpg",
    "description": "Nefertiti was the Great Royal Wife of Pharaoh Akhenaten and one of the most powerful and influential queens of Ancient Egypt. Renowned for her beauty, she played a prominent role in the religious revolution that introduced the worship of the sun disk Aten.",
    "achievements": [
      "Co-ruled with Akhenaten during the Amarna Period",
      "Played a key role in the promotion of Atenism",
      "Featured in the famous bust of Nefertiti, an icon of ancient art",
      "Possibly ruled as pharaoh under the name Neferneferuaten after Akhenaten’s death"
    ]
  },
    // {
    //   id: "tutankhamun",
    //   name: "Tutankhamun",
    //   dynasty: "18th Dynasty",
    //   period: "New Kingdom",
    //   reign: "1332–1323 BC",
    //   videoUrl: "Nefertiti.mp4",
    //   thumbnailUrl: "toutankamon.jpg",
    //   description: "Tutankhamun was an ancient Egyptian pharaoh who was the last of his royal family to rule during the end of the 18th Dynasty. His tomb, KV62, was discovered by Howard Carter in 1922, sparking worldwide fascination with ancient Egypt.",
    //   achievements: [
    //     "Restored the traditional Egyptian religion after his father's reforms",
    //     "Undertook extensive building projects, especially at Karnak",
    //     "His nearly intact tomb provided unprecedented insights into royal burial practices",
    //     "His golden burial mask became an iconic symbol of ancient Egypt"
    //   ]
    // },
    // {
    //   id: "hatshepsut",
    //   name: "Hatshepsut",
    //   dynasty: "18th Dynasty",
    //   period: "New Kingdom",
    //   reign: "1479–1458 BC",
    //   videoUrl: "/videos/hatshepsut.mp4",
    //   thumbnailUrl: "queen-hatshepsut.jpg",
    //   description: "Hatshepsut was the fifth pharaoh of the Eighteenth Dynasty of Egypt. She was the second historically confirmed female pharaoh, after Sobekneferu. Hatshepsut is generally regarded as one of the most successful pharaohs, reigning longer than any other woman of an indigenous Egyptian dynasty.",
    //   achievements: [
    //     "Established important trade networks, including a famous expedition to Punt",
    //     "Commissioned hundreds of construction projects throughout Egypt",
    //     "Built her mortuary temple Djeser-Djeseru, a masterpiece of ancient architecture",
    //     "Ruled during a period of peace and prosperity for Egypt"
    //   ]
    // },
    // {
    //   id: "cleopatra",
    //   name: "Cleopatra VII",
    //   dynasty: "Ptolemaic Dynasty",
    //   period: "Ptolemaic Kingdom",
    //   reign: "51–30 BC",
    //   videoUrl: "/videos/cleopatra.mp4",
    //   thumbnailUrl: "cleopatra.avif",
    //   description: "Cleopatra VII Philopator was the last active ruler of the Ptolemaic Kingdom of Egypt. A member of the Ptolemaic dynasty, she was a descendant of its founder Ptolemy I Soter, a Macedonian Greek general and companion of Alexander the Great.",
    //   achievements: [
    //     "Preserved Egypt's independence when much of the Mediterranean had fallen to Rome",
    //     "Formed strategic alliances with Julius Caesar and Mark Antony",
    //     "Was known for her intellect, speaking multiple languages including Egyptian",
    //     "Revitalized the Egyptian economy and expanded trade"
    //   ]
    // },
  ];

  const handleSelectPharaoh = (id: string) => {
    setSelectedPharaoh(id);
    setIsPlaying(false);
    setShowInfo(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.log("Playback prevented:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const selectedPharaohData = selectedPharaoh 
    ? pharaohs.find(pharaoh => pharaoh.id === selectedPharaoh) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Know Me</h1>
          <p className="text-gray-600 mb-8">
            Watch and learn as ancient Egyptian rulers come to life through advanced AI technology
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedPharaoh ? (
                <div className="bg-black rounded-lg overflow-hidden shadow-xl relative">
                  <div className="aspect-video bg-black relative">
                    <video
                      ref={videoRef}
                      src="/Nefertiti.mp4"
                      className="w-full h-full object-cover"
                      poster={selectedPharaohData?.thumbnailUrl}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      preload="metadata"
                    />
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button 
                            className="bg-white rounded-full p-2 text-black hover:bg-white/90 transition-colors"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </button>
                          <div className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            className="text-white hover:text-white/80 transition-colors"
                            onClick={toggleInfo}
                            aria-label="Show information"
                          >
                            <Info className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-white hover:text-white/80 transition-colors"
                            onClick={toggleMute}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div 
                        className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="h-full bg-kemet-dark"
                          style={{ 
                            width: `${(currentTime / duration) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Play button overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={togglePlay}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
                          aria-label="Play video"
                        >
                          <Play className="h-12 w-12 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Info panel */}
                  {showInfo && selectedPharaohData && (
                    <div className="p-6 bg-gradient-to-t from-kemet-dark to-kemet-medium text-white">
                      <h2 className="text-2xl font-bold mb-2">{selectedPharaohData.name}</h2>
                      <div className="mb-4">
                        <span className="inline-block px-2 py-1 bg-black/20 rounded-full text-xs mr-2">
                          {selectedPharaohData.dynasty}
                        </span>
                        <span className="inline-block px-2 py-1 bg-black/20 rounded-full text-xs mr-2">
                          {selectedPharaohData.period}
                        </span>
                        <span className="inline-block px-2 py-1 bg-black/20 rounded-full text-xs">
                          {selectedPharaohData.reign}
                        </span>
                      </div>
                      <p className="text-white/90 mb-4">
                        {selectedPharaohData.description}
                      </p>
                      <h3 className="font-bold mb-2">Key Achievements:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/90">
                        {selectedPharaohData.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-kemet-lightest rounded-lg p-8 shadow-md flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-6xl mb-4">👑</div>
                  <h2 className="text-xl font-bold mb-2">Select a Pharaoh</h2>
                  <p className="text-gray-600 text-center">
                    Choose a pharaoh from the list to watch their story come to life
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <h2 className="font-bold text-lg mb-4">Choose a Pharaoh</h2>
                
                <div className="space-y-3">
                  {pharaohs.map((pharaoh) => (
                    <button
                      key={pharaoh.id}
                      onClick={() => handleSelectPharaoh(pharaoh.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        selectedPharaoh === pharaoh.id 
                          ? 'bg-kemet-medium text-white' 
                          : 'bg-gray-50 hover:bg-kemet-light/30'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={pharaoh.thumbnailUrl}
                          alt={pharaoh.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{pharaoh.name}</h3>
                        <p className={`text-sm ${selectedPharaoh === pharaoh.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {pharaoh.dynasty}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <h2 className="font-bold text-lg mb-2">About This Feature</h2>
                <p className="text-gray-700 text-sm">
                  "Know Me" uses advanced AI technology to create realistic animations and simulations of ancient Egyptian rulers. The pharaohs tell their own stories using historically accurate information, helping you connect with history in a personal way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowMe;
