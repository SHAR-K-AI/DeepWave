'use client';

import React from 'react';
import Link from 'next/link';

import {useDispatch} from 'react-redux';
import {getAudioFileUrl} from "@/helpers/audio";

import {openModal} from "@/lib/store/slices/modalSlice";
import {setTrack, play} from '@/lib/store/slices/playerSlice';
import {toggleTrackSelection} from '@/lib/store/slices/tracksSlice';

import AppImage from "@/components/AppImage";
import EditTrackButton from "@/components/buttons/EditTrackButton";
import DeleteTrackButton from "@/components/buttons/DeleteTrackButton";

import {PlusCircleIcon, SpeakerWaveIcon} from '@heroicons/react/20/solid';

interface Track {
    id: string;
    title: string;
    artist: string;
    slug: string;
    coverImage: string;
    album: string;
    genres: string[];
    updatedAt: string;
    audioUrl: string;
}

/**
 *
 * @param track
 * @constructor
 */
const TrackItem: React.FC<{ track: Track }> = ({track}) => {
    const dispatch = useDispatch();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleTrackSelection(track.id));
    };

    const handlePlay = () => {
        dispatch(setTrack(track.audioFile ? getAudioFileUrl(track.audioFile) : "/api/audio/default"));
        dispatch(play());
    };

    const handleOpen = () => {
        dispatch(openModal({
            modalType: 'CREATE_TRACK',
        }));
    };

    return (
        <div
            key={track.id}
            data-testid={`track-item-${track.id}`}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center relative"
        >
            <input
                type="checkbox"
                onChange={handleCheckboxChange}
                className="absolute top-2 right-2"
            />
            <div className="mb-4 w-full">
                <AppImage
                    src={track.coverImage}
                    alt={track.title}
                    width={200}
                    height={200}
                    className="w-64 h-64 object-fit rounded-full m-auto"
                />
            </div>
            <div className="text-gray-600 font-semibold text-xl mb-2">{track.title}</div>
            <div className="text-gray-600 mb-1">Artist: {track.artist}</div>
            <div className="text-gray-500 mb-1">Album: {track.album}</div>
            <div className="text-gray-500 mb-1">Genres: {track.genres.join(', ')}</div>
            <div className="text-gray-400 text-sm mb-4">
                Updated At: {new Date(track.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: '2-digit'
            })}
            </div>

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition cursor-pointer"
                    onClick={handleOpen}>
                    <PlusCircleIcon className="h-5 w-5"/>
                </button>

                <button
                    onClick={handlePlay}
                    className="px-4 py-2 bg-blue-600  text-white rounded shadow hover:bg-blue-700 transition cursor-pointer"
                >
                    <SpeakerWaveIcon className="h-5 w-5"/>
                </button>
                <Link href={`/tracks/${track.slug}`} passHref>
                    <button
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md z-10 relative rounded cursor-pointer">
                        View
                    </button>
                </Link>
                <EditTrackButton slug={track.slug} className="rounded px-4"/>
                <DeleteTrackButton trackId={track.id} className="rounded px-4"/>
            </div>
        </div>
    );
};

export default TrackItem;
