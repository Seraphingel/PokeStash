import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Plus, Sparkles, Calendar, AlertCircle, Image as ImageIcon, Check, 
  Link as LinkIcon, Edit3, ArrowRight, Loader2, ExternalLink, ChevronDown, ChevronUp, RotateCcw,
  UploadCloud, Eye, Trash2
} from 'lucide-react';
import { EVENT_COLORS } from '../data/events';
import { getAssetUrl } from '../utils/assets';
import { getAvailablePokemonList, getPokemonPresetInfo, getPokemon3DIconUrl, resolvePokemon3DUrl } from '../utils/pokemonAssets';
import { fetchLeekDuckHtml, parseLeekDuckHtml } from '../utils/leekDuckParser';
import { detectCategoryFromText, findPokemonInText } from '../utils/infographicParser';

const CATEGORY_OPTIONS = [
  { id: 'event', label: 'Special Event', color: EVENT_COLORS.Event || '#65b679' },
  { id: 'raid', label: '5-Star Raid', color: EVENT_COLORS.Raid || '#b95749' },
  { id: 'mega', label: 'Mega Raid', color: EVENT_COLORS.Raid || '#b95749' },
  { id: 'shadow', label: 'Shadow Raid', color: EVENT_COLORS.Raid || '#b95749' },
  { id: 'spotlight', label: 'Spotlight Hour', color: EVENT_COLORS.Spotlight || '#dd9f53' },
  { id: 'max-battles', label: 'Max Battle', color: EVENT_COLORS.MaxBattle || '#843667' }
];

export function AddEventModal({ isOpen, onClose, onSave, initialEvent = null }) {
  const isEditing = Boolean(initialEvent && initialEvent.id);

  const pokemonList = useMemo(() => getAvailablePokemonList(), []);

  // Mode: 'manual' | 'link' | 'infographic'
  const [activeTab, setActiveTab] = useState('manual');

  // Manual Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('event');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [featuredPokemon, setFeaturedPokemon] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  const [weaknesses, setWeaknesses] = useState([]);
  const [weaknessInput, setWeaknessInput] = useState('');
  const [bonusesText, setBonusesText] = useState('');
  const [advice, setAdvice] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [formError, setFormError] = useState('');

  // Link Import State
  const [importUrl, setImportUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [importError, setImportError] = useState('');
  const [manualHtml, setManualHtml] = useState('');
  const [showPasteAccordion, setShowPasteAccordion] = useState(false);

  // Infographic Import State
  const [infographicPreviewUrl, setInfographicPreviewUrl] = useState('');
  const [infographicCategory, setInfographicCategory] = useState('raid');
  const [infographicStartDate, setInfographicStartDate] = useState('');
  const [infographicEndDate, setInfographicEndDate] = useState('');
  const [infographicPokemon, setInfographicPokemon] = useState('');
  const [infographicPokemonType, setInfographicPokemonType] = useState('');
  const [infographicWeaknesses, setInfographicWeaknesses] = useState([]);
  const [infographicTitle, setInfographicTitle] = useState('');
  const [infographicBonuses, setInfographicBonuses] = useState('');
  const [infographicAdvice, setInfographicAdvice] = useState('');
  const [useInfographicAsBanner, setUseInfographicAsBanner] = useState(true);
  const [infographicError, setInfographicError] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Manual Verification State (Holds parsed data for user review)
  const [parsedVerification, setParsedVerification] = useState(null);

  // Reset or initialize fields when modal opens / initialEvent changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialEvent) {
      setActiveTab('manual');
      setName(initialEvent.name || '');
      setCategory(initialEvent.category || (initialEvent.type === 'max-battles' ? 'max-battles' : 'event'));
      setStartDate(initialEvent.start || initialEvent.date || '');
      setEndDate(initialEvent.end || initialEvent.start || initialEvent.date || '');
      
      const rawFeatured = Array.isArray(initialEvent.details?.featured) 
        ? initialEvent.details.featured[0] 
        : (initialEvent.details?.featured || '');
      setFeaturedPokemon(rawFeatured || '');
      
      setPokemonType(initialEvent.details?.type || '');
      
      const rawWeak = initialEvent.details?.weaknesses || [];
      setWeaknesses(Array.isArray(rawWeak) ? rawWeak : [rawWeak].filter(Boolean));
      
      const rawBonuses = initialEvent.details?.bonuses || (initialEvent.bonus ? [initialEvent.bonus] : []);
      setBonusesText(Array.isArray(rawBonuses) ? rawBonuses.join('\n') : String(rawBonuses));
      
      setAdvice(initialEvent.details?.advice || '');
      setCustomImageUrl(initialEvent.imageUrl || '');
      setFormError('');
      setParsedVerification(null);
    } else {
      // Default: today's date
      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, '0');
      const d = String(today.getDate()).padStart(2, '0');
      const todayStr = `${y}-${m}-${d}`;

      setActiveTab('manual');
      setName('');
      setCategory('event');
      setStartDate(todayStr);
      setEndDate(todayStr);
      setFeaturedPokemon('');
      setPokemonType('');
      setWeaknesses([]);
      setWeaknessInput('');
      setBonusesText('');
      setAdvice('');
      setCustomImageUrl('');
      setFormError('');

      // Reset Link Import
      setImportUrl('');
      setImportError('');
      setManualHtml('');
      setShowPasteAccordion(false);

      // Reset Infographic Import
      setInfographicPreviewUrl('');
      setInfographicCategory('raid');
      setInfographicStartDate(todayStr);
      setInfographicEndDate(todayStr);
      setInfographicPokemon('');
      setInfographicPokemonType('');
      setInfographicWeaknesses([]);
      setInfographicTitle('');
      setInfographicBonuses('');
      setInfographicAdvice('');
      setUseInfographicAsBanner(true);
      setInfographicError('');

      setParsedVerification(null);
    }
  }, [isOpen, initialEvent]);

  // When featured Pokémon changes, auto-resolve presets if fields are empty
  const handlePokemonChange = (val) => {
    setFeaturedPokemon(val);
    const preset = getPokemonPresetInfo(val);
    if (preset) {
      if (!pokemonType) {
        setPokemonType(preset.type);
      }
      if (weaknesses.length === 0 && preset.weaknesses) {
        setWeaknesses(preset.weaknesses);
      }
    }
  };

  // Preview event icon resolution for manual form
  const previewIconUrl = useMemo(() => {
    if (customImageUrl) return customImageUrl;
    const dummyEvt = {
      name: name || featuredPokemon,
      details: {
        featured: featuredPokemon ? [featuredPokemon] : []
      }
    };
    return getPokemon3DIconUrl(dummyEvt);
  }, [customImageUrl, name, featuredPokemon]);

  // Selected Category Color
  const activeColor = useMemo(() => {
    const opt = CATEGORY_OPTIONS.find(c => c.id === category);
    return opt ? opt.color : EVENT_COLORS.Event;
  }, [category]);

  // Add Weakness Tag
  const handleAddWeakness = (e) => {
    if (e && e.key && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    const tag = weaknessInput.trim();
    if (!tag) return;
    if (!weaknesses.includes(tag)) {
      setWeaknesses([...weaknesses, tag]);
    }
    setWeaknessInput('');
  };

  const handleRemoveWeakness = (index) => {
    setWeaknesses(weaknesses.filter((_, i) => i !== index));
  };

  // --- Link Import Handlers ---
  const handleFetchAndParseLink = async () => {
    const url = importUrl.trim();
    if (!url) {
      setImportError('Please enter a Leek Duck event link.');
      return;
    }

    setIsFetching(true);
    setImportError('');
    try {
      const html = await fetchLeekDuckHtml(url);
      const parsed = parseLeekDuckHtml(html, url);
      setParsedVerification(parsed);
    } catch (err) {
      setImportError(err.message || 'Failed to fetch or parse the event link.');
      setShowPasteAccordion(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleParseManualHtml = () => {
    const text = manualHtml.trim();
    if (!text) {
      setImportError('Please paste HTML or webpage text to parse.');
      return;
    }

    try {
      const parsed = parseLeekDuckHtml(text, importUrl.trim());
      setParsedVerification(parsed);
      setImportError('');
    } catch (_err) {
      setImportError('Could not parse the pasted content. Ensure it contains event information.');
    }
  };

  // --- Infographic Image Handlers ---
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setInfographicError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    setInfographicError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setInfographicPreviewUrl(dataUrl);

      // Heuristically detect category or Pokemon from filename
      const fn = file.name || '';
      const detectedCat = detectCategoryFromText(fn);
      if (detectedCat) setInfographicCategory(detectedCat);

      const detectedPkmn = findPokemonInText(fn);
      if (detectedPkmn) {
        handleInfographicPokemonChange(detectedPkmn);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInfographicDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleInfographicPokemonChange = (val) => {
    setInfographicPokemon(val);
    const preset = getPokemonPresetInfo(val);
    if (preset) {
      setInfographicPokemonType(preset.type || '');
      setInfographicWeaknesses(preset.weaknesses || []);
      
      const catOpt = CATEGORY_OPTIONS.find(c => c.id === infographicCategory);
      const catLabel = catOpt ? catOpt.label : 'Event';
      if (!infographicTitle || infographicTitle.includes('Raid') || infographicTitle.includes('Event')) {
        setInfographicTitle(`${val} in ${catLabel}s`);
      }
    }
  };

  const handleInfographicReview = () => {
    if (!infographicStartDate) {
      setInfographicError('Start date is required.');
      return;
    }

    const catOpt = CATEGORY_OPTIONS.find(c => c.id === infographicCategory);
    const catLabel = catOpt ? catOpt.label : 'Event';
    const autoTitle = infographicTitle.trim() || `${infographicPokemon || 'New'} ${catLabel}`;
    const resolvedIcon = resolvePokemon3DUrl(infographicPokemon);

    setParsedVerification({
      name: autoTitle,
      category: infographicCategory,
      startDate: infographicStartDate,
      endDate: infographicEndDate || infographicStartDate,
      featuredPokemon: infographicPokemon,
      pokemonType: infographicPokemonType,
      weaknesses: infographicWeaknesses,
      imageUrl: resolvedIcon || (useInfographicAsBanner ? infographicPreviewUrl : ''),
      bonusesText: infographicBonuses,
      advice: infographicAdvice,
      sourceUrl: ''
    });
  };

  // User confirms the imported details: Save directly!
  const handleConfirmVerificationSave = () => {
    if (!parsedVerification) return;

    const bonusesList = (parsedVerification.bonusesText || '')
      .split('\n')
      .map(b => b.replace(/^•\s*/, '').trim())
      .filter(b => b.length > 0);

    const catOpt = CATEGORY_OPTIONS.find(c => c.id === parsedVerification.category);
    const catColor = catOpt ? catOpt.color : EVENT_COLORS.Event;

    const eventPayload = {
      name: parsedVerification.name.trim(),
      category: parsedVerification.category,
      type: parsedVerification.category === 'max-battles' ? 'max-battles' : parsedVerification.category,
      start: parsedVerification.startDate,
      end: parsedVerification.endDate || parsedVerification.startDate,
      color: catColor,
      imageUrl: parsedVerification.imageUrl || '',
      isCustom: true,
      details: {
        featured: parsedVerification.featuredPokemon ? [parsedVerification.featuredPokemon.trim()] : [parsedVerification.name.trim()],
        ...(parsedVerification.pokemonType ? { type: parsedVerification.pokemonType.trim() } : {}),
        ...(parsedVerification.weaknesses?.length > 0 ? { weaknesses: parsedVerification.weaknesses } : {}),
        ...(bonusesList.length > 0 ? { bonuses: bonusesList } : {}),
        ...(parsedVerification.advice ? { advice: parsedVerification.advice.trim() } : {})
      }
    };

    onSave(eventPayload);
    onClose();
  };

  // User wants to edit/adjust imported details in the manual form
  const handleEditImportedDetails = () => {
    if (!parsedVerification) return;

    setName(parsedVerification.name || '');
    setCategory(parsedVerification.category || 'event');
    setStartDate(parsedVerification.startDate || '');
    setEndDate(parsedVerification.endDate || parsedVerification.startDate || '');
    setFeaturedPokemon(parsedVerification.featuredPokemon || '');
    setPokemonType(parsedVerification.pokemonType || '');
    setWeaknesses(parsedVerification.weaknesses || []);
    setBonusesText(parsedVerification.bonusesText || '');
    setAdvice(parsedVerification.advice || '');
    setCustomImageUrl(parsedVerification.imageUrl || '');

    setParsedVerification(null);
    setActiveTab('manual');
  };

  // Manual Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Event title is required.');
      return;
    }
    if (!startDate) {
      setFormError('Start date is required.');
      return;
    }

    const bonusesList = bonusesText
      .split('\n')
      .map(b => b.replace(/^•\s*/, '').trim())
      .filter(b => b.length > 0);

    const eventPayload = {
      name: name.trim(),
      category,
      type: category === 'max-battles' ? 'max-battles' : category,
      start: startDate,
      end: endDate || startDate,
      color: activeColor,
      imageUrl: previewIconUrl || customImageUrl || '',
      isCustom: true,
      details: {
        featured: featuredPokemon ? [featuredPokemon.trim()] : [name.trim()],
        ...(pokemonType ? { type: pokemonType.trim() } : {}),
        ...(weaknesses.length > 0 ? { weaknesses } : {}),
        ...(bonusesList.length > 0 ? { bonuses: bonusesList } : {}),
        ...(advice ? { advice: advice.trim() } : {})
      }
    };

    onSave(eventPayload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
        padding: '20px'
      }} 
      onClick={onClose}
    >
      <div 
        className="add-event-modal-dialog"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="add-event-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px',
              borderRadius: '12px',
              background: `${activeColor}25`,
              color: activeColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {activeTab === 'link' ? <LinkIcon size={22} /> : activeTab === 'infographic' ? <ImageIcon size={22} /> : <Calendar size={22} />}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                {isEditing ? 'Edit Custom Event' : 'Add Custom Event'}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                {isEditing ? 'Update details for this event' : 'Create manually, from a link, or from an infographic graphic'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher (Visible when creating, not editing) */}
        {!isEditing && (
          <div style={{
            display: 'flex',
            padding: '8px 24px',
            gap: '8px',
            background: 'var(--color-surface-subtle)',
            borderBottom: '1px solid var(--color-border)',
            overflowX: 'auto'
          }}>
            <button
              type="button"
              onClick={() => { setActiveTab('manual'); setParsedVerification(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: activeTab === 'manual' ? '700' : '500',
                background: activeTab === 'manual' ? 'var(--color-surface-solid)' : 'transparent',
                color: activeTab === 'manual' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: activeTab === 'manual' ? '1px solid var(--color-border)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'manual' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Edit3 size={15} />
              Manual
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('link'); setParsedVerification(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: activeTab === 'link' ? '700' : '500',
                background: activeTab === 'link' ? 'var(--color-surface-solid)' : 'transparent',
                color: activeTab === 'link' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: activeTab === 'link' ? '1px solid var(--color-border)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'link' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <LinkIcon size={15} />
              Leek Duck Link
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('infographic'); setParsedVerification(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: activeTab === 'infographic' ? '700' : '500',
                background: activeTab === 'infographic' ? 'var(--color-surface-solid)' : 'transparent',
                color: activeTab === 'infographic' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: activeTab === 'infographic' ? '1px solid var(--color-border)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'infographic' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <ImageIcon size={15} />
              Infographic (g47ix)
            </button>
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>

          {/* ========================================================================= */}
          {/* SHARED MANUAL VERIFICATION SCREEN (Shown after Link or Infographic parse) */}
          {/* ========================================================================= */}
          {parsedVerification ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Verification Banner */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1.5px solid #10B981',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  background: '#10B981',
                  color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={18} strokeWidth={3} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#10B981' }}>
                    Event Details Parsed — Please Verify
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    Please review the extracted details below to confirm that everything is accurate before saving.
                  </p>
                </div>
              </div>

              {/* Visual Event Review Card */}
              <div className="add-event-subcard" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* 3D Model Avatar */}
                  <div className="add-event-img-preview-box" style={{
                    width: '74px', height: '74px',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '6px',
                    flexShrink: 0
                  }}>
                    {parsedVerification.imageUrl ? (
                      <img 
                        src={getAssetUrl(parsedVerification.imageUrl)} 
                        alt={parsedVerification.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/pokemon/pokeball.png';
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))' }}
                      />
                    ) : (
                      <ImageIcon size={30} opacity={0.4} />
                    )}
                  </div>

                  {/* Core Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <span style={{
                        background: CATEGORY_OPTIONS.find(c => c.id === parsedVerification.category)?.color || '#65b679',
                        color: 'white',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                        padding: '3px 10px',
                        borderRadius: '8px'
                      }}>
                        {CATEGORY_OPTIONS.find(c => c.id === parsedVerification.category)?.label || 'Event'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        {parsedVerification.startDate} {parsedVerification.endDate && parsedVerification.endDate !== parsedVerification.startDate ? `→ ${parsedVerification.endDate}` : ''}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {parsedVerification.name}
                    </h3>

                    {/* Featured Pokémon & Weaknesses */}
                    {parsedVerification.featuredPokemon && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                          ⭐ {parsedVerification.featuredPokemon}
                        </span>
                        {parsedVerification.pokemonType && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                            ({parsedVerification.pokemonType})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Weaknesses Chips */}
                {parsedVerification.weaknesses && parsedVerification.weaknesses.length > 0 && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                      BATTLE WEAKNESSES:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {parsedVerification.weaknesses.map((w, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#EF4444',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bonuses */}
                {parsedVerification.bonusesText && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      EVENT BONUSES:
                    </span>
                    <div style={{ fontSize: '0.82rem', whiteSpace: 'pre-line', color: 'var(--color-text-primary)' }}>
                      {parsedVerification.bonusesText}
                    </div>
                  </div>
                )}

                {/* Advice / Description */}
                {parsedVerification.advice && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      STRATEGY / DETAILS:
                    </span>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                      {parsedVerification.advice}
                    </p>
                  </div>
                )}

                {/* Source URL */}
                {parsedVerification.sourceUrl && (
                  <div style={{ marginTop: '14px', paddingTop: '8px', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem' }}>
                    <a 
                      href={parsedVerification.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                    >
                      <span>View on Leek Duck</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Verification Decision Actions */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={handleConfirmVerificationSave}
                  style={{
                    flex: 2,
                    background: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <Check size={18} strokeWidth={2.5} />
                  Confirm & Save Event
                </button>

                <button
                  type="button"
                  onClick={handleEditImportedDetails}
                  className="add-event-category-btn-unselected"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit3 size={16} />
                  Adjust Fields
                </button>

                <button
                  type="button"
                  onClick={() => setParsedVerification(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    padding: '12px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={14} />
                  Back
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ========================================================================= */}
              {/* TAB 3: INFOGRAPHIC IMPORT (g47ix / Event Graphics)                        */}
              {/* ========================================================================= */}
              {activeTab === 'infographic' && (
                <div>
                  {!infographicPreviewUrl ? (
                    <div 
                      className="add-event-dropzone"
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                      onDragLeave={() => setIsDraggingOver(false)}
                      onDrop={handleInfographicDrop}
                      onClick={() => document.getElementById('infographic-file-input')?.click()}
                      style={{
                        borderColor: isDraggingOver ? 'var(--color-primary)' : undefined,
                        background: isDraggingOver ? 'rgba(229, 57, 53, 0.08)' : undefined
                      }}
                    >
                      <input 
                        id="infographic-file-input"
                        type="file" 
                        accept="image/png, image/jpeg, image/webp" 
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageFile(e.target.files[0]);
                          }
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '56px', height: '56px',
                          borderRadius: '50%',
                          background: 'rgba(229, 57, 53, 0.1)',
                          color: 'var(--color-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <UploadCloud size={28} />
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>
                            Upload an Event Infographic
                          </h4>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                            Drag and drop a g47ix monthly calendar, raid infographic, or event announcement (PNG, JPG).
                          </p>
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          background: 'var(--color-surface-solid)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          fontWeight: '600'
                        }}>
                          Browse Computer
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Split Layout: Image Reference on Top/Left, Smart Clarification Form */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Top Visual Reference Box */}
                      <div className="add-event-subcard" style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <Eye size={14} /> Infographic Reference
                          </span>
                          <button
                            type="button"
                            onClick={() => setInfographicPreviewUrl('')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#EF4444',
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 size={13} />
                            Change Image
                          </button>
                        </div>

                        <div style={{
                          maxHeight: '260px',
                          overflowY: 'auto',
                          borderRadius: '10px',
                          background: 'rgba(0,0,0,0.05)',
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '4px'
                        }}>
                          <img 
                            src={infographicPreviewUrl} 
                            alt="Infographic" 
                            style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '8px' }}
                          />
                        </div>
                      </div>

                      {/* Error Banner if any */}
                      {infographicError && (
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#EF4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '0.85rem'
                        }}>
                          {infographicError}
                        </div>
                      )}

                      {/* Smart Clarification Section */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* 1. Category */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                            1. Select Event Category
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {CATEGORY_OPTIONS.map(opt => {
                              const isSelected = infographicCategory === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    setInfographicCategory(opt.id);
                                    if (infographicPokemon) {
                                      setInfographicTitle(`${infographicPokemon} in ${opt.label}s`);
                                    }
                                  }}
                                  className={isSelected ? '' : 'add-event-category-btn-unselected'}
                                  style={{
                                    background: isSelected ? opt.color : undefined,
                                    color: isSelected ? '#ffffff' : undefined,
                                    border: isSelected ? `1.5px solid ${opt.color}` : undefined,
                                    borderRadius: '10px',
                                    padding: '7px 12px',
                                    fontSize: '0.82rem',
                                    fontWeight: isSelected ? '700' : '500',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                  }}
                                >
                                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSelected ? '#fff' : opt.color }} />
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 2. Dates */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                              Start Date <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="date"
                              required
                              className="add-event-input"
                              value={infographicStartDate}
                              onChange={e => {
                                setInfographicStartDate(e.target.value);
                                if (!infographicEndDate || infographicEndDate < e.target.value) {
                                  setInfographicEndDate(e.target.value);
                                }
                                setInfographicError('');
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                              End Date
                            </label>
                            <input 
                              type="date"
                              className="add-event-input"
                              value={infographicEndDate}
                              onChange={e => setInfographicEndDate(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* 3. Clarify Pokémon (Instant 1,369-species Autocomplete & 3D Icon Linker) */}
                        <div className="add-event-subcard">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Sparkles size={16} color="var(--color-primary)" /> 
                              2. Clarify Pokémon Boss / Mascot
                            </label>
                            {infographicPokemon && (
                              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Check size={14} /> 3D Sprite Linked
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <input 
                                type="text"
                                list="infographic-pokemon-suggestions"
                                className="add-event-input"
                                value={infographicPokemon}
                                onChange={e => handleInfographicPokemonChange(e.target.value)}
                                placeholder="Type the Pokémon shown in the graphic (e.g. Dialga, Mega Charizard X)"
                              />
                              <datalist id="infographic-pokemon-suggestions">
                                {pokemonList.map((pName, i) => (
                                  <option key={i} value={pName} />
                                ))}
                              </datalist>
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                Typing the Pokémon connects to the PokeMiners CDN for its official 3D sprite and battle stats!
                              </span>
                            </div>

                            {/* Live 3D Model Preview */}
                            <div className="add-event-img-preview-box" style={{
                              width: '60px', height: '60px',
                              borderRadius: '12px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              padding: '4px',
                              flexShrink: 0
                            }}>
                              {infographicPokemon ? (
                                <img 
                                  src={getAssetUrl(resolvePokemon3DUrl(infographicPokemon))} 
                                  alt="Preview" 
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/pokemon/pokeball.png';
                                  }}
                                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                                />
                              ) : (
                                <ImageIcon size={22} opacity={0.4} />
                              )}
                            </div>
                          </div>

                          {/* Auto-resolved Weaknesses Chips */}
                          {infographicWeaknesses.length > 0 && (
                            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                                AUTO-RESOLVED WEAKNESSES ({infographicPokemonType}):
                              </span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {infographicWeaknesses.map((w, idx) => (
                                  <span key={idx} style={{
                                    background: 'rgba(239, 68, 68, 0.12)',
                                    color: '#EF4444',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                  }}>
                                    {w}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 4. Event Title */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                            3. Event Title
                          </label>
                          <input 
                            type="text"
                            className="add-event-input"
                            value={infographicTitle}
                            onChange={e => setInfographicTitle(e.target.value)}
                            placeholder="e.g. Dialga in 5-Star Raids"
                          />
                        </div>

                        {/* 5. Optional Bonuses */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                            Bonuses (Optional)
                          </label>
                          <input 
                            type="text"
                            className="add-event-input"
                            value={infographicBonuses}
                            onChange={e => setInfographicBonuses(e.target.value)}
                            placeholder="e.g. 2× Catch Candy, 1 Rare Candy XL from Raid Battles"
                          />
                        </div>

                        {/* Checkbox: Use Infographic as Banner */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input 
                            type="checkbox"
                            checked={useInfographicAsBanner}
                            onChange={e => setUseInfographicAsBanner(e.target.checked)}
                            style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                          />
                          <span>Save this infographic as custom event banner image</span>
                        </label>

                        {/* Action: Proceed to Verification Screen */}
                        <button
                          type="button"
                          onClick={handleInfographicReview}
                          style={{
                            background: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '8px',
                            boxShadow: '0 4px 14px rgba(229, 57, 53, 0.3)'
                          }}
                        >
                          Review & Verify Event
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: IMPORT FROM LEEK DUCK LINK                                         */}
              {/* ========================================================================= */}
              {activeTab === 'link' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '6px' }}>
                      Leek Duck Event URL
                    </label>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                      Paste the link of any specific Leek Duck event page to automatically extract the schedule, featured 3D Pokémon, and event details.
                    </p>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="url" 
                        className="add-event-input"
                        value={importUrl}
                        onChange={e => { setImportUrl(e.target.value); setImportError(''); }}
                        placeholder="https://leekduck.com/events/pokemon-horizons-the-series-celebration-event-2026/"
                        style={{ flex: 1 }}
                        disabled={isFetching}
                      />
                      <button
                        type="button"
                        onClick={handleFetchAndParseLink}
                        disabled={isFetching || !importUrl.trim()}
                        style={{
                          background: isFetching || !importUrl.trim() ? '#9CA3AF' : 'var(--color-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '0 20px',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          cursor: isFetching || !importUrl.trim() ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexShrink: 0
                        }}
                      >
                        {isFetching ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          <>
                            Fetch & Auto-Fill
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Alert */}
                  {importError && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Import Error</div>
                        <div>{importError}</div>
                      </div>
                    </div>
                  )}

                  {/* Instant Manual Paste Fallback Accordion */}
                  <div className="add-event-subcard" style={{ padding: '14px 16px' }}>
                    <button
                      type="button"
                      onClick={() => setShowPasteAccordion(!showPasteAccordion)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        padding: 0,
                        fontWeight: '600',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>📋</span> Or paste Leek Duck HTML / Text manually
                      </span>
                      {showPasteAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {showPasteAccordion && (
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                          If an ad-blocker or firewall blocks network requests, open the Leek Duck page, copy its page content (or press Ctrl+U to view source), and paste it here:
                        </p>
                        <textarea
                          rows={4}
                          className="add-event-input"
                          value={manualHtml}
                          onChange={e => setManualHtml(e.target.value)}
                          placeholder="Paste HTML or copied page text here..."
                          style={{ resize: 'vertical', fontSize: '0.8rem', fontFamily: 'monospace' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={handleParseManualHtml}
                            disabled={!manualHtml.trim()}
                            style={{
                              background: !manualHtml.trim() ? '#9CA3AF' : 'var(--color-primary)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.82rem',
                              fontWeight: '600',
                              cursor: !manualHtml.trim() ? 'not-allowed' : 'pointer'
                            }}
                          >
                            Parse Content
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 1: MANUAL ENTRY FORM                                                  */}
              {/* ========================================================================= */}
              {activeTab === 'manual' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Form Error Alert */}
                  {formError && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <AlertCircle size={18} />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Event Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                      Event Title <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="add-event-input"
                      value={name}
                      onChange={e => { setName(e.target.value); setFormError(''); }}
                      placeholder="e.g. Origin Giratina Raid Weekend, Mega Lucario Raid Day"
                    />
                  </div>

                  {/* Category Chips */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px' }}>
                      Event Category
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {CATEGORY_OPTIONS.map(opt => {
                        const isSelected = category === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setCategory(opt.id)}
                            className={isSelected ? '' : 'add-event-category-btn-unselected'}
                            style={{
                              background: isSelected ? opt.color : undefined,
                              color: isSelected ? '#ffffff' : undefined,
                              border: isSelected ? `1.5px solid ${opt.color}` : undefined,
                              borderRadius: '10px',
                              padding: '8px 14px',
                              fontSize: '0.85rem',
                              fontWeight: isSelected ? '700' : '500',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSelected ? '#fff' : opt.color }} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date Pickers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                        Start Date <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input 
                        type="date"
                        required
                        className="add-event-input"
                        value={startDate}
                        onChange={e => {
                          setStartDate(e.target.value);
                          if (!endDate || endDate < e.target.value) {
                            setEndDate(e.target.value);
                          }
                          setFormError('');
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
                        End Date
                      </label>
                      <input 
                        type="date"
                        className="add-event-input"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Featured Pokémon with Auto-complete & 3D Sprite Preview */}
                  <div className="add-event-subcard">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="var(--color-primary)" /> Featured Pokémon (Auto 3D Model)
                      </label>
                      {previewIconUrl && (
                        <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> 3D Icon Linked
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="text"
                          list="pokemon-suggestions"
                          className="add-event-input"
                          value={featuredPokemon}
                          onChange={e => handlePokemonChange(e.target.value)}
                          placeholder="Type Pokémon name (e.g. Origin Giratina, Lucario)"
                        />
                        <datalist id="pokemon-suggestions">
                          {pokemonList.map((pName, i) => (
                            <option key={i} value={pName} />
                          ))}
                        </datalist>
                        <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                          Typing any known Pokémon automatically resolves its 3D sprite, types, and weaknesses!
                        </span>
                      </div>

                      {previewIconUrl ? (
                        <div className="add-event-img-preview-box" style={{
                          width: '64px', height: '64px',
                          borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '4px',
                          flexShrink: 0
                        }}>
                          <img 
                            src={getAssetUrl(previewIconUrl)} 
                            alt="Preview" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/pokemon/pokeball.png';
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                          />
                        </div>
                      ) : (
                        <div className="add-event-img-preview-box" style={{
                          width: '64px', height: '64px',
                          borderRadius: '12px',
                          borderStyle: 'dashed',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--color-text-secondary)',
                          flexShrink: 0
                        }}>
                          <ImageIcon size={22} opacity={0.5} />
                        </div>
                      )}
                    </div>

                    {/* Type & Weaknesses Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                          Pokémon Type
                        </label>
                        <input 
                          type="text"
                          className="add-event-input"
                          value={pokemonType}
                          onChange={e => setPokemonType(e.target.value)}
                          placeholder="e.g. Ghost / Dragon"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                          Add Weakness Tag
                        </label>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <input 
                            type="text"
                            className="add-event-input"
                            value={weaknessInput}
                            onChange={e => setWeaknessInput(e.target.value)}
                            onKeyDown={handleAddWeakness}
                            placeholder="e.g. Ice"
                          />
                          <button
                            type="button"
                            onClick={handleAddWeakness}
                            className="add-event-category-btn-unselected"
                            style={{
                              padding: '0 12px',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Weakness Tags List */}
                    {weaknesses.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {weaknesses.map((w, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#EF4444',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {w}
                        <button
                          type="button"
                          onClick={() => handleRemoveWeakness(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Bonuses */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  Event Bonuses (One per line)
                </label>
                <textarea 
                  rows={2}
                  className="add-event-input"
                  value={bonusesText}
                  onChange={e => setBonusesText(e.target.value)}
                  placeholder="e.g. 2× Catch Candy&#10;Increased Shiny chance&#10;Up to 5 free Raid Passes"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Strategy / Advice */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  Strategy Advice / Notes
                </label>
                <input 
                  type="text"
                  className="add-event-input"
                  value={advice}
                  onChange={e => setAdvice(e.target.value)}
                  placeholder="e.g. Soloable with high-level Fighting attackers."
                />
              </div>

              {/* Optional Custom Image URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  Custom Image URL (Optional override)
                </label>
                <input 
                  type="text"
                  className="add-event-input"
                  value={customImageUrl}
                  onChange={e => setCustomImageUrl(e.target.value)}
                  placeholder="/assets/events/... or https://..."
                />
              </div>

              {/* Footer Actions for Manual Form */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="add-event-category-btn-unselected"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(229, 57, 53, 0.3)'
                  }}
                >
                  {isEditing ? 'Update Event' : 'Save Event'}
                </button>
              </div>
            </form>
          )}
          </>
          )}

        </div>
      </div>
    </div>
  );
}
