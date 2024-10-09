import { useState } from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const kindleClass = woodKindling && !woodOnFire && "kindle";

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  let torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60
  };

  const handleMouseDown = () => {
    setTorchEquipped(true);
  };

  const handleMouseUp = () => {
    setTorchEquipped(false);
  };

  const handleMouseEnterWood = () => {
    if (torchEquipped && !woodOnFire) {
      setWoodKindling(true);
    }
  };

  const handleMouseLeaveWood = () => {
    if (torchEquipped && woodKindling) {
      setWoodOnFire(true);
      setWoodKindling(false);
    }
  };

  return (
    <div
      className={`wrapper ${torchEquipped && "relative no-cursor"}`}
      onMouseUp={handleMouseUp}
    >
      <div className={`game-area ${!torchEquipped && "relative"}`}>
        <div
          className={`torch-container ${torchEquipped && "torch-equipped"}`}
          style={torchEquipped ? torchStyle : null}
          onMouseDown={handleMouseDown}
        >
          <Torch />
        </div>

        <div
          className={`wood-container ${kindleClass}`}
          onMouseEnter={handleMouseEnterWood}
          onMouseLeave={handleMouseLeaveWood}
        >
          🪵
          <Fire woodOnFire={woodOnFire} />
        </div>
      </div>
    </div>
  );
}
