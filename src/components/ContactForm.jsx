import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

export default function SubIndustryImages() {
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [subIndustries, setSubIndustries] = useState([])
  const [selectedSubIndustry, setSelectedSubIndustry] = useState('')
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [visibleCounts, setVisibleCounts] = useState({})
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  useEffect(() => {
    fetchIndustries()
  }, [])

  const fetchIndustries = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/industries/with-subindustries')
      const data = await res.json()
      setIndustries(data || [])
    } catch {
      showToast('Failed to fetch industries', 'error')
    }
  }

  const handleIndustryChange = (e) => {
    const industryId = e.target.value
    setSelectedIndustry(industryId)
    setSelectedSubIndustry('')
    setGroups([])
    const found = industries.find(i => i.id === industryId)
    setSubIndustries(found ? found.subIndustries : [])
  }

  const handleSubIndustryChange = (e) => {
    const subId = e.target.value
    setSelectedSubIndustry(subId)
    if (subId) fetchImages(subId)
  }

  const fetchImages = async (subIndustryId) => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/subindustries/${subIndustryId}/images/grouped`)
      const data = await res.json()
      setGroups(data.groups || [])
      const initialCounts = {}
      ;(data.groups || []).forEach((g, i) => initialCounts[i] = 6)
      setVisibleCounts(initialCounts)
    } catch {
      showToast('Failed to fetch images', 'error')
    }
    setLoading(false)
  }

  const handleLoadMore = (index) => {
    setVisibleCounts(prev => ({
      ...prev,
      [index]: prev[index] + 6
    }))
  }

  const handleDelete = async (imageId, groupIndex) => {
    const confirmed = window.confirm('Delete this image?')
    if (!confirmed) return
    try {
      const res = await fetch(`http://localhost:5000/api/display-images/${imageId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error()
      const updatedGroups = [...groups]
      updatedGroups[groupIndex].images =
        updatedGroups[groupIndex].images.filter(img => img.id !== imageId)
      setGroups(updatedGroups)
      showToast('Image deleted')
    } catch {
      showToast('Delete failed', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Sub Industry Images
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Select an industry and sub industry to manage images
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">

          <div className="flex flex-col w-full md:w-72">
            <label className="text-sm text-gray-600 mb-2">
              Industry
            </label>
            <select
              value={selectedIndustry}
              onChange={handleIndustryChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Industry</option>
              {industries.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {ind.name}
                </option>
              ))}
            </select>
          </div>

          {selectedIndustry && (
            <div className="flex flex-col w-full md:w-72">
              <label className="text-sm text-gray-600 mb-2">
                Sub Industry
              </label>
              <select
                value={selectedSubIndustry}
                onChange={handleSubIndustryChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Sub Industry</option>
                {subIndustries.map(sub => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        {loading && (
          <p className="text-center text-blue-500 font-medium">
            Loading images...
          </p>
        )}

        {groups.map((group, index) => (
          <div key={index} className="mb-10">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Group {index + 1}
              </h2>
              <span className="text-sm text-gray-500">
                Total: {group.total}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {group.images.slice(0, visibleCounts[index]).map(img => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.file}
                    alt="sub-industry"
                    className="w-full h-36 object-cover rounded-xl shadow hover:shadow-lg transition duration-300"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleDelete(img.id, index)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {visibleCounts[index] < group.images.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handleLoadMore(index)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        ))}.

      </div>

      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}  