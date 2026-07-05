import { useState } from 'react';

const JourneyMap = () => {
  const [expandedParents, setExpandedParents] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const toggleParent = (id: string) => {
    setExpandedParents(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Horizontal layout - each project moves to the right
  const nodes = [
    { id: 'Libft', x: 70, y: 70, tier: 1, completed: true },
    { id: 'get_next_line', x: 220, y: 170, tier: 1, completed: true },
    { id: 'BornToBeRoot', x: 370, y: 120, tier: 1, completed: true },
    { id: 'ft_printf', x: 530, y: 70, tier: 1, completed: true },
    { id: 'Mini_Talk', x: 680, y: 170, tier: 2, completed: true },
    { id: 'Push_swap', x: 830, y: 120, tier: 2, completed: true },
    { id: 'Fract_ol', x: 980, y: 70, tier: 2, completed: true },
    { id: 'Philosophers', x: 1130, y: 170, tier: 2, completed: true },
    { id: 'MiniShell', x: 1280, y: 120, tier: 2, completed: true },
    { id: 'Cube_3D', x: 1430, y: 70, tier: 2, completed: true },
    
    // CPP 1/2 with expandable children
    { id: 'cpp_1/2', x: 1580, y: 170, tier: 3, completed: true, parent: true, childCount: 5 },
    { id: 'cpp_00', x: 1450, y: 200, tier: 4, completed: true, childOf: 'cpp_1/2' },
    { id: 'cpp_01', x: 1400, y: 290, tier: 4, completed: true, childOf: 'cpp_1/2' },
    { id: 'cpp_02', x: 1500, y: 290, tier: 4, completed: true, childOf: 'cpp_1/2' },
    { id: 'cpp_03', x: 1600, y: 290, tier: 4, completed: true, childOf: 'cpp_1/2' },
    { id: 'cpp_04', x: 1700, y: 290, tier: 4, completed: true, childOf: 'cpp_1/2' },
    
    { id: 'Net_Practice', x: 1730, y: 70, tier: 3, completed: true },
    { id: 'Ft_irc', x: 1880, y: 170, tier: 3, completed: true },
    
    // CPP 2/2 with expandable children
    { id: 'cpp_2/2', x: 2030, y: 120, tier: 3, completed: true, parent: true, childCount: 5 },
    { id: 'cpp_04', x: 2150, y: 80, tier: 4, completed: true, childOf: 'cpp_2/2' },
    { id: 'cpp_05', x: 2250, y: 80, tier: 4, completed: true, childOf: 'cpp_2/2' },
    { id: 'cpp_06', x: 2200, y: 170, tier: 4, completed: true, childOf: 'cpp_2/2' },
    { id: 'cpp_08', x: 2450, y: 80, tier: 4, completed: true, childOf: 'cpp_2/2' },
    { id: 'cpp_09', x: 2550, y: 80, tier: 4, completed: true, childOf: 'cpp_2/2' },
    
    { id: 'Inception', x: 2950, y: 250, tier: 5, completed: true },
    { id: 'Ft_transcendence', x: 3150, y: 250, tier: 5, completed: false },
  ];

  // const edges = [
  //   { from: 'Libft', to: 'get_next_line' },
  //   { from: 'get_next_line', to: 'BornToBeRoot' },
  //   { from: 'BornToBeRoot', to: 'ft_printf' },
  //   { from: 'ft_printf', to: 'Mini_Talk' },
  //   { from: 'Mini_Talk', to: 'Push_swap' },
  //   { from: 'Push_swap', to: 'Fract_ol' },
  //   { from: 'Fract_ol', to: 'Philosophers' },
  //   { from: 'Philosophers', to: 'MiniShell' },
  //   { from: 'MiniShell', to: 'Cube_3D' },
  //   { from: 'Cube_3D', to: 'cpp_1/2' },
  //   { from: 'cpp_1/2', to: 'cpp_00' },
  //   { from: 'cpp_1/2', to: 'cpp_01' },
  //   { from: 'cpp_1/2', to: 'cpp_02' },
  //   { from: 'cpp_1/2', to: 'cpp_03' },
  //   { from: 'cpp_1/2', to: 'cpp_04' },
  //   { from: 'cpp_1/2', to: 'Net_Practice' },
  //   { from: 'Net_Practice', to: 'Ft_irc' },
  //   { from: 'Ft_irc', to: 'cpp_2/2' },
  //   { from: 'cpp_2/2', to: 'cpp_04*' },
  //   { from: 'cpp_2/2', to: 'cpp_05' },
  //   { from: 'cpp_2/2', to: 'cpp_06' },
  //   { from: 'cpp_2/2', to: 'cpp_08' },
  //   { from: 'cpp_2/2', to: 'cpp_09' },
  //   { from: 'cpp_2/2', to: 'Inception' },
  //   { from: 'Inception', to: 'Ft_transcendence' },
  // ];

  // const getNode = (id: string) => nodes.find(n => n.id === id);

  const getTierColor = (tier: number, completed: boolean) => {
    if (!completed) return { bg: '#374151', stroke: '#555', glow: 'rgba(100, 100, 100, 0.3)' };
    
    const colors = {
      1: { bg: '#dbeafe', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' },
      2: { bg: '#ddd6fe', stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.4)' },
      3: { bg: '#fce7f3', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)' },
      4: { bg: '#fed7aa', stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.4)' },
      5: { bg: '#bbf7d0', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    };
    return colors[tier as keyof typeof colors] || colors[1];
  };
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden" style={{ background: 'transparent' }}>
      <div className="relative" style={{ minWidth: '3300px', height: '350px' }}>
        <svg width="3300" height="350" className="absolute top-0 left-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient> */}
          </defs>

          {/* Main path line */}
          {/* {edges.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            if (!from || !to) return null;
            
            const isChild = to.childOf;
            const parentExpanded = to.childOf ? expandedParents.includes(to.childOf) : true;
            if (isChild && !parentExpanded) return null;
            
            const isHovered = hoveredNode === edge.from || hoveredNode === edge.to;
            
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHovered ? '#fff' : isChild ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)'}
                strokeWidth={isHovered ? '4' : '2'}
                strokeDasharray={isChild ? '5,5' : '0'}
                className="transition-all duration-300"
              />
            );
          })} */}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getTierColor(node.tier, node.completed || false);
            const isHovered = hoveredNode === node.id;
            const size = node.parent ? 55 : node.childOf ? 35 : 45;
            
            const isChild = !!node.childOf;
            const parentExpanded = node.childOf ? expandedParents.includes(node.childOf) : true;
            if (isChild && !parentExpanded) return null;
            
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => node.parent && toggleParent(node.id)}
                className={node.parent ? "cursor-pointer" : "cursor-default"}
                style={{
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  transformOrigin: `${node.x}px ${node.y}px`,
                  transition: 'all 0.3s'
                }}
              >
                {/* Glow effect */}
                {/* {isHovered && node.completed && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={size + 10}
                    fill={colors.glow}
                    className="animate-pulse"
                  />
                )} */}
                
                {/* Main hexagon shape using path */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={size+10}
                  fill={colors.bg}
                  stroke={colors.stroke}
                  strokeWidth="3"
                 
                />

                {/* Inner border */}
                {/* <circle
                  cx={node.x}
                  cy={node.y}
                  r={size}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                /> */}

                {/* Completion checkmark */}
                {/* {node.completed && !node.parent && (
                  <text
                    x={node.x + size - 15}
                    y={node.y - size + 15}
                    fontSize="16"
                    fill="#10b981"
                    style={{ filter: 'drop-shadow(0 0 3px rgba(16, 185, 129, 0.8))' }}
                  >
                    ✓
                  </text>
                )} */}

                {/* Parent expand indicator */}
                {node.parent && (
                  <g>
                    <circle
                      cx={node.x + size - 12}
                      cy={node.y - size + 12}
                      r="12"
                      fill={colors.stroke}
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.completed ? node.y + 5 : node.y + 20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-bold select-none pointer-events-none textWrap-none"
                      fill="#000"
                      style={{ 
                        fontSize: node.childOf ? '9px' : '11px',
                      }}
                    >
                      {node.id}
                    </text>
                  </g>
                )}

                {/* Lock icon for incomplete */}
                {!node.completed && (
                  <text
                    x={node.x}
                    y={node.y - 5}
                    textAnchor="middle"
                    fontSize="20"
                    fill="#666"
                  >
                    🔒
                  </text>
                )}

                {/* Node label */}
                <text
                  x={node.x}
                  y={node.completed ? node.y + 5 : node.y + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold select-none pointer-events-none"
                  fill="#000"
                  style={{ 
                    fontSize: node.childOf ? '10px' : '12px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {node.id.length > 11 ? (
                    <>
                      <tspan x={node.x} dy="-0.5em">{node.id.substring(0, 11)}</tspan>
                      <tspan x={node.x} dy="1.3em">{node.id.substring(11)}</tspan>
                    </>
                  ) : (
                    node.id
                  )}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default JourneyMap;