import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Send, Calculator, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModelViewer from '../components/ModelViewer';

interface ModelConfig {
  id: string;
  file: File;
  quantity: number;
  units: string;
  material: string;
  materialType: string;
  color: string;
  infill: string;
  showViewer: boolean;
  process: string;
}

const Custom = () => {
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedModels, setExpandedModels] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.slice(fileName.lastIndexOf('.'));
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'));
    return `${nameWithoutExt.slice(0, maxLength - extension.length - 3)}...${extension}`;
  };
  
  const materials = {
    Resin: {
      types: [
        { name: 'Standard white material (UTR 8360)', price: 3700 },
        { name: 'UTR Imagine Black', price: 4100 },
        { name: 'UTR-8100 (transparent)', price: 4500 },
        { name: 'PWR Dark Black', price: 3900 },
        { name: 'UTR-8100 (translucent)', price: 4300 },
        { name: 'Somos ® Ledo', price: 4900 },
        { name: 'UTR 8220', price: 3800 },
        { name: 'Somos ® Taurus', price: 5300 },
        { name: 'UTR 3000', price: 3700 },
        { name: 'UTR Therm', price: 4800 },
        { name: 'Somos ® EvoLVe 128', price: 5800 },
        { name: 'UTR Flex', price: 4500 },
        { name: 'Somos ® PerFORM', price: 6200 },
        { name: 'TDS EvoDent', price: 6600 },
        { name: 'Formlabs ESD Resin', price: 7000 }
      ],
      process: 'SLA',
      basePrice: 3700
    },
    Nylon: {
      types: [
        { name: 'PA12', price: 5300 },
        { name: 'HP-PA-12', price: 6100 },
        { name: 'Glass fiber nylon(PA12+35% GF)', price: 7400 }
      ],
      process: 'SLS',
      basePrice: 5300
    },
    PLA: {
      types: [
        { name: 'PLA', price: 2000 },
        { name: 'PLA+', price: 2500 }
      ],
      colors: [
        { name: 'White', hex: '#FFFFFF', price: 0 },
        { name: 'Black', hex: '#000000', price: 0 },
        { name: 'Grey', hex: '#808080', price: 0 },
        { name: 'Yellow', hex: '#FFFF00', price: 0 },
        { name: 'Red', hex: '#FF0000', price: 0 },
        { name: 'Green', hex: '#00FF00', price: 0 },
        { name: 'Blue', hex: '#0000FF', price: 0 },
        { name: 'Orange', hex: '#FFA500', price: 0 },
        { name: 'Pink', hex: '#FFC0CB', price: 0 },
        { name: 'Multi-colors', hex: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)', price: 400 },
        { name: 'Marble', hex: 'url(#marble)', price: 650 },
        { name: 'Silk gold', hex: '#FFD700', price: 800 },
        { name: 'Silk silver', hex: '#C0C0C0', price: 800 },
        { name: 'Silk copper', hex: '#B87333', price: 800 },
        { name: 'Arctic Whisper', hex: 'linear-gradient(45deg, #ADD8E6, #FFFFFF)', price: 1000 },
        { name: 'Solar Breeze', hex: 'linear-gradient(45deg, #FF0000, #FFFFFF)', price: 1000 },
        { name: 'Ocean to Meadow', hex: 'linear-gradient(45deg, #0000FF, #00FF00)', price: 1000 }
      ],
      process: 'FDM',
      basePrice: 2000
    },
    ABS: {
      types: [
        { name: 'ABS', price: 2900 },
        { name: 'Stratasys ABS-ESD7', price: 3700 }
      ],
      colors: {
        'ABS': [
          { name: 'White', hex: '#FFFFFF', price: 0 },
          { name: 'Black', hex: '#000000', price: 0 },
          { name: 'Silver gray', hex: '#C0C0C0', price: 0 },
          { name: 'Red', hex: '#FF0000', price: 0 },
          { name: 'Blue', hex: '#0000FF', price: 0 },
          { name: 'Yellow', hex: '#FFFF00', price: 0 },
          { name: 'Green', hex: '#00FF00', price: 0 }
        ],
        'Stratasys ABS-ESD7': [
          { name: 'Black', hex: '#000000', price: 0 }
        ]
      },
      process: 'FDM',
      basePrice: 2900
    }
  };

  const calculatePrice = (model: ModelConfig) => {
    if (!model.material || !model.materialType) return 0;

    let basePrice = 0;
    const selectedMaterialType = materials[model.material].types.find(type => type.name === model.materialType);
    if (selectedMaterialType) {
      basePrice = selectedMaterialType.price;
    }

    let colorPrice = 0;
    if (model.color && materials[model.material].colors) {
      const colorData = Array.isArray(materials[model.material].colors) 
        ? materials[model.material].colors.find(c => c.name === model.color)
        : materials[model.material].colors[model.materialType]?.find(c => c.name === model.color);
      
      if (colorData) {
        colorPrice = colorData.price || 0;
      }
    }

    const infillModifier = parseInt(model.infill) / 100;
    const infillPrice = basePrice * infillModifier * 0.2;

    const totalPrice = (basePrice + colorPrice + infillPrice) * model.quantity;
    return totalPrice;
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    const allowedTypes = ['.stl', '.obj', '.step', '.stp'];
    
    const newModels: ModelConfig[] = [];
    Array.from(files).forEach(file => {
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (allowedTypes.includes(fileExtension)) {
        const newModel: ModelConfig = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          quantity: 1,
          units: 'mm',
          material: '',
          materialType: '',
          color: '',
          infill: '20%',
          showViewer: false,
          process: ''
        };
        newModels.push(newModel);
      } else {
        alert(`File ${file.name} is not supported. Please upload only .stl, .obj, .step, or .stp files`);
      }
    });
    
    // Reset the file input to allow re-uploading the same file
    event.target.value = '';
    
    setModels(prev => [...newModels, ...prev]);
    setExpandedModels(prev => [...newModels.map(m => m.id), ...prev]);
  }, []);

  const handleSubmitRequest = () => {
    setShowLoginModal(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const toggleModelExpansion = (id: string) => {
    setExpandedModels(prev =>
      prev.includes(id)
        ? prev.filter(modelId => modelId !== id)
        : [...prev, id]
    );
  };

  const updateModel = (id: string, updates: Partial<ModelConfig>) => {
    setModels(prev => prev.map(model => {
      if (model.id === id) {
        const updatedModel = { ...model, ...updates };
        if (updates.material && materials[updates.material]) {
          updatedModel.process = materials[updates.material].process;
        }
        return updatedModel;
      }
      return model;
    }));
  };

  const removeModel = (id: string) => {
    setModels(prev => prev.filter(model => model.id !== id));
    setExpandedModels(prev => prev.filter(modelId => modelId !== id));
  };

  const getTotalPrice = () => {
    return models.reduce((total, model) => total + calculatePrice(model), 0);
  };

  const toggleViewer = (id: string) => {
    setModels(prev => prev.map(model =>
      model.id === id ? { ...model, showViewer: !model.showViewer } : model
    ));
  };

  return (
    <div className="pt-16 md:pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Custom Manufacturing</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your ideas into reality with our custom manufacturing services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-4 md:p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Upload Your Designs</h2>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center hover:border-black transition-colors duration-300 cursor-pointer"
              >
                <input
                  type="file"
                  accept=".stl,.obj,.step,.stp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  multiple
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                  <p className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="mt-1 md:mt-2 text-xs text-gray-500">
                    Supported formats: STL, OBJ, STEP, STP (Max 50MB per file)
                  </p>
                </label>
              </div>
            </motion.div>

            <AnimatePresence>
              {models.map((model) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-4 md:p-6 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleModelExpansion(model.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {expandedModels.includes(model.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        <h3 className="text-lg md:text-xl font-bold">
                          {isMobile ? truncateFileName(model.file.name, 15) : model.file.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeModel(model.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={isMobile ? 16 : 20} />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedModels.includes(model.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 md:p-8"
                      >
                        <div className="mb-4">
                          <button
                            onClick={() => toggleViewer(model.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                          >
                            {model.showViewer ? (
                              <>
                                <ChevronUp size={20} />
                                <span>Hide Viewer</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown size={20} />
                                <span>Show Viewer</span>
                              </>
                            )}
                          </button>
                        </div>

                        {model.showViewer && (
                          <div className="mb-6 border rounded-lg p-4">
                            <ModelViewer file={model.file} />
                          </div>
                        )}

                        <div className="space-y-4 md:space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <label className="text-sm font-medium text-gray-700">Quantity:</label>
                              <input
                                type="number"
                                min="1"
                                value={model.quantity}
                                onChange={(e) => updateModel(model.id, { quantity: parseInt(e.target.value) || 1 })}
                                className="w-20 md:w-24 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Design Units</label>
                              <div className="flex space-x-4">
                                {['mm', 'cm', 'inch'].map((unit) => (
                                  <label key={unit} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      value={unit}
                                      checked={model.units === unit}
                                      onChange={(e) => updateModel(model.id, { units: e.target.value })}
                                      className="text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{unit}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Material</label>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.keys(materials).map((mat) => (
                                  <label key={mat} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50">
                                    <input
                                      type="radio"
                                      value={mat}
                                      checked={model.material === mat}
                                      onChange={(e) => updateModel(model.id, {
                                        material: e.target.value,
                                        materialType: '',
                                        color: ''
                                      })}
                                      className="text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{mat}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {model.material && (
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Material Type</label>
                                <div className="grid grid-cols-1 gap-2">
                                  {materials[model.material].types.map((type) => (
                                    <label key={type.name} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50">
                                      <div className="flex items-center space-x-2">
                                        <input
                                          type="radio"
                                          value={type.name}
                                          checked={model.materialType === type.name}
                                          onChange={(e) => updateModel(model.id, { materialType: e.target.value })}
                                          className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{type.name}</span>
                                      </div>
                                      <span className="text-xs md:text-sm text-gray-600">₹{type.price}/unit</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}

                            {model.material && model.materialType && materials[model.material].colors && (
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <div className="grid grid-cols-2 gap-2">
                                  {(Array.isArray(materials[model.material].colors) 
                                    ? materials[model.material].colors 
                                    : materials[model.material].colors[model.materialType]
                                  ).map((colorOption) => (
                                    
                 <label
                                      key={colorOption.name}
                                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                                        model.color === colorOption.name ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        value={colorOption.name}
                                        checked={model.color === colorOption.name}
                                        onChange={(e) => updateModel(model.id, { color: e.target.value })}
                                        className="text-blue-500 focus:ring-blue-500 mr-2"
                                      />
                                      <div
                                        className="w-4 h-4 md:w-6 md:h-6 rounded-full mr-2"
                                        style={{ background: colorOption.hex }}
                                      />
                                      <span className="text-xs md:text-sm">{colorOption.name}</span>
                                      {colorOption.price > 0 && (
                                        <span className="ml-auto text-xs md:text-sm text-gray-600">+₹{colorOption.price}</span>
                                      )}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Infill</label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {['20%', '40%', '60%', '80%', '95%', '100%'].map((value) => (
                                  <label key={value} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50">
                                    <input
                                      type="radio"
                                      value={value}
                                      checked={model.infill === value}
                                      onChange={(e) => updateModel(model.id, { infill: e.target.value })}
                                      className="text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{value}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 md:space-y-8 sticky top-20 md:top-32"
            >
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                  <Calculator className="mr-2" size={isMobile ? 20 : 24} />
                  Quote Summary
                </h2>
                
                {models.map((model, index) => (
                  <div key={model.id} className="mb-4 p-3 md:p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">
                      Model {index + 1}: {isMobile ? truncateFileName(model.file.name, 15) : model.file.name}
                    </h3>
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                      {model.material && (
                        <>
                          <p><span className="text-gray-600">Material:</span> {model.material}</p>
                          {model.materialType && <p><span className="text-gray-600">Type:</span> {model.materialType}</p>}
                          {model.color && <p><span className="text-gray-600">Color:</span> {model.color}</p>}
                          <p><span className="text-gray-600">Process:</span> {model.process}</p>
                          <p><span className="text-gray-600">Units:</span> {model.units}</p>
                          <p><span className="text-gray-600">Infill:</span> {model.infill}</p>
                          <p><span className="text-gray-600">Quantity:</span> {model.quantity}</p>
                          <p><span className="text-gray-600">Price:</span> ₹{calculatePrice(model).toFixed(2)}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg md:text-xl font-bold">
                    <span>Total Price:</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Price includes material, color, and infill costs</p>
                </div>

                <button 
                  onClick={handleSubmitRequest}
                  className="w-full flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={models.length === 0}
                >
                  <Send size={isMobile ? 16 : 20} />
                  <span className="text-sm md:text-base">Submit Request</span>
                </button>
                
                <p className="mt-4 text-xs md:text-sm text-gray-500">
                  Note: The price currently displayed is the system's pre-quotation (for reference ONLY), 
                  and the official quotation will be generated after manual review by engineer in according 
                  to the complexity of the part structure and process requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Please Login</h3>
            <p className="text-gray-600 mb-4">You need to login to submit your request.</p>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Custom;