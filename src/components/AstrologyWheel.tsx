import React, { useState } from 'react';
import { PlanetPosition, HouseData, ZODIAC_SIGNS, Aspect } from '../utils/astrology';

interface AstrologyWheelProps {
  natalChart: {
    planets: PlanetPosition[];
    houses: HouseData[];
    ascendant: number;
    aspects: Aspect[];
  };
  transitChart: {
    planets: PlanetPosition[];
  };
  onHoverPlanet: (planet: PlanetPosition | null, type: 'natal' | 'transit') => void;
  onHoverHouse: (house: HouseData | null) => void;
  onSelectPlanet?: (planet: PlanetPosition, type: 'natal' | 'transit') => void;
  hideOuterPlanets?: boolean;
}

export default function AstrologyWheel({
  natalChart,
  transitChart,
  onHoverPlanet,
  onHoverHouse,
  onSelectPlanet,
  hideOuterPlanets = false,
}: AstrologyWheelProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<{ id: string; type: 'natal' | 'transit' | 'house' | 'aspect'; name: string } | null>(null);

  const cx = 250;
  const cy = 250;
  const rZodiac = 180;
  const rHouses = 145;
  const rTransit = 215;
  const rNatal = 110;
  const rAspects = 80;

  const asc = natalChart.ascendant;

  // Convert longitude (0-360) to SVG screen coordinates
  // ASC is pointing left (9 o'clock) which of 180 degrees, and longitudes increase counter-clockwise.
  const getCoords = (longitude: number, radius: number) => {
    // Relative angle from ascendant
    const relLong = longitude - asc;
    // Map to standard screen angles: ASC at 180, rotating counter-clockwise (increasing angle)
    const angleRads = (180 + relLong) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(angleRads),
      y: cy + radius * Math.sin(angleRads),
      angle: (180 + relLong) % 360,
    };
  };

  // Filter outer planets (Uranus, Neptune, Pluto) if hideOuterPlanets is activated
  const isOuterPlanet = (pId: string) => {
    return pId === 'uranus' || pId === 'neptune' || pId === 'pluto';
  };

  const isOuterPlanetName = (name: string) => {
    return name.includes('天王星') || name.includes('海王星') || name.includes('冥王星');
  };

  const natalPlanetsFiltered = hideOuterPlanets 
    ? natalChart.planets.filter(p => !isOuterPlanet(p.id)) 
    : natalChart.planets;

  const transitPlanetsFiltered = hideOuterPlanets 
    ? transitChart.planets.filter(p => !isOuterPlanet(p.id)) 
    : transitChart.planets;

  const aspectsFiltered = hideOuterPlanets 
    ? natalChart.aspects.filter(a => !isOuterPlanetName(a.planetA) && !isOuterPlanetName(a.planetB))
    : natalChart.aspects;

  return (
    <div className="relative w-full max-w-[500px] mx-auto glass p-4 rounded-3xl shadow-2xl overflow-hidden group border border-[#c5a059]/20">
      {/* Dynamic Starry Dust Background */}
      <div className="absolute inset-0 bg-[#090e1a]/70 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=20')] bg-cover opacity-15 mix-blend-color-dodge pointer-events-none" />

      {/* On-screen Tooltip Header Overlay */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-10 pointer-events-none glass px-3 py-1.5 rounded-full text-xs text-slate-300 border border-[#c5a059]/20 no-print print:hidden">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="font-medium text-slate-100">
            {hoveredElement ? `${hoveredElement.name}` : "游標停靠行星/宮位看細節"}
          </span>
        </div>
        <div className="text-[#e5c583] font-mono text-[10px]">
          {hoveredElement?.type === 'natal' && "🔘 本命星"}
          {hoveredElement?.type === 'transit' && "🪐 流年星"}
          {hoveredElement?.type === 'house' && "🏠 宮位圈"}
          {!hoveredElement && "雙盤對照圖"}
        </div>
      </div>

      <svg
        id="astrology-svg-chart"
        viewBox="0 0 500 500"
        className="w-full h-auto relative z-10 select-none"
      >
        {/* Subtle Constellation Grid Background with Antique Gold styling */}
        <circle cx={cx} cy={cy} r={rTransit + 15} fill="none" stroke="#c5a059" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3,3" />
        <circle cx={cx} cy={cy} r={rZodiac} fill="none" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx={cx} cy={cy} r={rHouses} fill="none" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.2" />

        {/* 1. Zodiac Signs Rings (The sky wheel) */}
        {ZODIAC_SIGNS.map((sign, index) => {
          const startLong = index * 30;
          const endLong = (index + 1) * 30;
          const midLong = startLong + 15;

          const startCoords = getCoords(startLong, rZodiac);
          const endCoords = getCoords(endLong, rZodiac);
          const labelCoords = getCoords(midLong, rZodiac - 18);

          // Alternating luxury starry celestial sectors
          const fillHex = index % 2 === 0 ? 'rgba(15, 23, 42, 0.45)' : 'rgba(9, 14, 26, 0.6)';

          return (
            <g key={sign.name}>
              {/* Pie Slice section for Zodiac */}
              <path
                d={`M ${cx} ${cy} L ${startCoords.x} ${startCoords.y} A ${rZodiac} ${rZodiac} 0 0 1 ${endCoords.x} ${endCoords.y} Z`}
                fill={fillHex}
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="0.5"
              />
              {/* Divider lines */}
              <line
                x1={cx}
                y1={cy}
                x2={startCoords.x}
                y2={startCoords.y}
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="0.5"
                strokeDasharray="2,4"
              />
              {/* Zodiac Symbol Glyph */}
              <text
                x={labelCoords.x}
                y={labelCoords.y + 5}
                textAnchor="middle"
                className="fill-slate-400 font-sans text-sm font-semibold transition-all duration-300 pointer-events-none select-none group-hover:fill-[#e5c583]"
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* 2. Equal House Divisions starting from ASC */}
        {natalChart.houses.map((house) => {
          const startCusp = house.longitudeCusp;
          const endCusp = (startCusp + 30) % 360;
          const midCusp = startCusp + 15;

          const cuspCoords = getCoords(startCusp, rHouses);
          const textCoords = getCoords(midCusp, rHouses - 18);

          const isHovered = activeSegment === house.number;

          return (
            <g
              key={house.name}
              onMouseEnter={() => {
                setActiveSegment(house.number);
                setHoveredElement({ id: `h${house.number}`, type: 'house', name: `${house.name} - ${house.meaning}` });
                onHoverHouse(house);
              }}
              onMouseLeave={() => {
                setActiveSegment(null);
                setHoveredElement(null);
                onHoverHouse(null);
              }}
              className="cursor-pointer transition-colors duration-200"
            >
              {/* Slices of Houses */}
              <path
                d={`M ${cx} ${cy} L ${getCoords(startCusp, rHouses).x} ${getCoords(startCusp, rHouses).y} A ${rHouses} ${rHouses} 0 0 1 ${getCoords(endCusp, rHouses).x} ${getCoords(endCusp, rHouses).y} Z`}
                fill={isHovered ? 'rgba(197, 160, 89, 0.1)' : 'transparent'}
                stroke={isHovered ? '#c5a059' : 'rgba(197, 160, 89, 0.15)'}
                strokeWidth={isHovered ? '1.5' : '0.5'}
              />

              {/* Bold Primary cusp divider for Ascendant (House 1) and Midheaven boundary */}
              <line
                x1={cx}
                y1={cy}
                x2={cuspCoords.x}
                y2={cuspCoords.y}
                stroke={house.number === 1 ? '#ef4444' : 'rgba(197, 160, 89, 0.25)'}
                strokeWidth={house.number === 1 ? '2.5' : '1'}
                className="transition-all duration-300"
              />

              {/* Roman numeral / regular digits house indicators */}
              <circle
                cx={textCoords.x}
                cy={textCoords.y}
                r="8.5"
                className={`${isHovered ? 'fill-[#c5a059]/40 stroke-[#c5a059]' : 'fill-[#090e1a]/90 stroke-[rgba(197,160,89,0.25)]'}`}
                strokeWidth="1"
              />
              <text
                x={textCoords.x}
                y={textCoords.y + 3}
                textAnchor="middle"
                className={`font-mono text-[9px] font-bold ${isHovered ? 'fill-slate-100' : 'fill-slate-400'}`}
              >
                {house.number}
              </text>
            </g>
          );
        })}

        {/* 3. Central Aspect Connection Lines (Aspects) */}
        <circle cx={cx} cy={cy} r={rAspects} fill="none" stroke="#c5a059" strokeOpacity="0.2" strokeWidth="1" />
        <g>
          {aspectsFiltered.map((aspect, index) => {
            const pA = natalChart.planets.find(p => p.name === aspect.planetA);
            const pB = natalChart.planets.find(p => p.name === aspect.planetB);

            if (!pA || !pB) return null;

            const coordsA = getCoords(pA.longitude, rAspects - 5);
            const coordsB = getCoords(pB.longitude, rAspects - 5);

            // Aspect line color-coding
            let strokeColor = '#c5a059'; // neutral gold
            if (aspect.type === 'trine' || aspect.type === 'sextile') {
              strokeColor = '#10b981'; // positive green
            } else if (aspect.type === 'square' || aspect.type === 'opposition') {
              strokeColor = '#ef4444'; // challenging red
            }

            return (
              <line
                key={`aspect-${index}`}
                x1={coordsA.x}
                y1={coordsA.y}
                x2={coordsB.x}
                y2={coordsB.y}
                stroke={strokeColor}
                strokeWidth="1"
                strokeOpacity="0.55"
                strokeDasharray={aspect.type === 'conjunction' ? 'none' : '3,3'}
                onMouseEnter={() => {
                  setHoveredElement({
                    id: `aspect-${index}`,
                    type: 'aspect',
                    name: `${aspect.planetA} 呈 ${aspect.name} ${aspect.planetB} (差 ${aspect.orb.toFixed(1)}°)`
                  });
                }}
                onMouseLeave={() => setHoveredElement(null)}
                className="hover:stroke-opacity-100 hover:stroke-[2px] transition-all cursor-crosshair"
              />
            );
          })}
        </g>

        {/* 4. Natal Planets Inner Orbits (🔘 Center ring) */}
        <circle cx={cx} cy={cy} r={rNatal} fill="none" stroke="#c5a059" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="10,5" />
        {natalPlanetsFiltered.map((planet) => {
          const coords = getCoords(planet.longitude, rNatal);
          const signName = ZODIAC_SIGNS[planet.signIndex].name;
          return (
            <g
              key={`natal-${planet.id}`}
              onMouseEnter={() => {
                setHoveredElement({
                  id: planet.id,
                  type: 'natal',
                  name: `本命 ${planet.name}: ${signName} ${planet.degreeInSign.toFixed(1)}° (第 ${planet.house} 宮)`
                });
                onHoverPlanet(planet, 'natal');
              }}
              onMouseLeave={() => {
                setHoveredElement(null);
                onHoverPlanet(null, 'natal');
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlanet?.(planet, 'natal');
              }}
              className="cursor-pointer focus:outline-none"
            >
              {/* Invisible larger hit target circle (16px) to fix jumping / hard to click issues */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="16"
                fill="transparent"
              />
              {/* Glowing anchor point */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="11"
                fill="#1c160e"
                stroke="#c5a059"
                strokeWidth="1.5"
                className="hover:fill-[#2d2416] hover:stroke-amber-400 hover:stroke-[2.5px] transition-all shadow-lg"
              />
              <text
                x={coords.x}
                y={coords.y + 4}
                textAnchor="middle"
                className="fill-[#e5c583] font-sans text-xs font-bold"
              >
                {planet.symbol}
              </text>
              {/* Optional retrograde indicator */}
              {planet.isRetrograde && (
                <text
                  x={coords.x + 9}
                  y={coords.y - 4}
                  className="fill-red-400 font-mono text-[7px] font-bold"
                >
                  Rx
                </text>
              )}
            </g>
          );
        })}

        {/* 5. Transit Planets Outer Orbit (🪐 Largest ring) */}
        <circle cx={cx} cy={cy} r={rTransit} fill="none" stroke="#c5a059" strokeOpacity="0.25" strokeWidth="1" />
        {transitPlanetsFiltered.map((planet) => {
          const coords = getCoords(planet.longitude, rTransit);
          const signName = ZODIAC_SIGNS[planet.signIndex].name;
          return (
            <g
              key={`transit-${planet.id}`}
              onMouseEnter={() => {
                setHoveredElement({
                  id: planet.id,
                  type: 'transit',
                  name: `流年 ${planet.name}: ${signName} ${planet.degreeInSign.toFixed(1)}° (落入本命第 ${planet.house} 宮)`
                });
                onHoverPlanet(planet, 'transit');
              }}
              onMouseLeave={() => {
                setHoveredElement(null);
                onHoverPlanet(null, 'transit');
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlanet?.(planet, 'transit');
              }}
              className="cursor-pointer focus:outline-none"
            >
              {/* Invisible larger hit target circle (16px) to fix jumping / click issues */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="16"
                fill="transparent"
              />
              {/* Gold/Bronze style for outer transit planets */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="11"
                fill="#16120e"
                stroke="#e5c583"
                strokeWidth="1.5"
                className="hover:fill-[#2a2218] hover:stroke-amber-300 hover:stroke-[2.5px] transition-all shadow-lg"
              />
              <text
                x={coords.x}
                y={coords.y + 4}
                textAnchor="middle"
                className="fill-[#e5c583] font-sans text-xs font-bold"
              >
                {planet.symbol}
              </text>
              {/* Outer retrograde indicator */}
              {planet.isRetrograde && (
                <text
                  x={coords.x + 9}
                  y={coords.y - 4}
                  className="fill-[#e5c583] font-mono text-[7px] font-bold"
                >
                  Rx
                </text>
              )}
            </g>
          );
        })}

        {/* 6. Ascendant indicator line pointing West */}
        <line
          x1={cx - rTransit - 10}
          y1={cy}
          x2={cx - rNatal + 20}
          y2={cy}
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4,2"
        />
        {/* Label for Ascendant */}
        <g transform={`translate(${cx - rTransit - 25}, ${cy + 4})`}>
          <rect x="-10" y="-8" width="22" height="15" rx="3" fill="#ef4444" />
          <text textAnchor="middle" className="fill-white font-mono text-[9px] font-bold">
            ASC
          </text>
        </g>
      </svg>

      <div className="mt-2 flex justify-center items-center space-x-4 text-[10px] text-slate-300 glass p-2.5 rounded-2xl font-mono border border-[#c5a059]/10">
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1c160e] border border-[#c5a059]" />
          <span>🔘 本命盤 (內)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16120e] border border-[#e5c583]" />
          <span>🪐 流年盤 (外)</span>
        </div>
        <div className="flex items-center space-x-1 text-red-400 font-bold">
          <span>ASC 上升點</span>
        </div>
      </div>
    </div>
  );
}
