<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="Reservation API",
 *     version="1.0.0",
 *     description="API documentation for managing restaurant reservations"
 * )
 */
class ReservationController extends Controller
{

   /**
 * @OA\Get(
 *     path="/api/reservations",
 *     summary="Get all reservations",
 *     tags={"Reservations"},
 *     @OA\Response(
 *         response=200,
 *         description="List of reservations"
 *     )
 * )
 */
public function index()
{
    return Reservation::all();
}

/**
 * @OA\Post(
 *     path="/api/reservations",
 *     summary="Create a new reservation",
 *     tags={"Reservations"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"restaurant_id", "user_id", "reservation_date", "reservation_time", "party_size", "status"},
 *             @OA\Property(property="restaurant_id", type="integer", example=1),
 *             @OA\Property(property="user_id", type="integer", example=2),
 *             @OA\Property(property="reservation_date", type="string", format="date", example="2025-05-19"),
 *             @OA\Property(property="reservation_time", type="string", example="18:30:00"),
 *             @OA\Property(property="party_size", type="integer", example=4),
 *             @OA\Property(property="status", type="string", example="confirmed")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Reservation created"
 *     )
 * )
 */
public function store(Request $request)
{
    return Reservation::create($request->all());
}

/**
 * @OA\Get(
 *     path="/api/reservations/{id}",
 *     summary="Get a reservation by ID",
 *     tags={"Reservations"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Reservation ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Reservation found"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Reservation not found"
 *     )
 * )
 */
public function show($id)
{
    return Reservation::findOrFail($id);
}

/**
 * @OA\Put(
 *     path="/api/reservations/{id}",
 *     summary="Update a reservation",
 *     tags={"Reservations"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Reservation ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="restaurant_id", type="integer", example=1),
 *             @OA\Property(property="user_id", type="integer", example=2),
 *             @OA\Property(property="reservation_date", type="string", format="date", example="2025-05-19"),
 *             @OA\Property(property="reservation_time", type="string", example="18:30:00"),
 *             @OA\Property(property="party_size", type="integer", example=4),
 *             @OA\Property(property="status", type="string", example="confirmed")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Reservation updated"
 *     )
 * )
 */
public function update(Request $request, $id)
{
    $reservation = Reservation::findOrFail($id);
    $reservation->update($request->all());
    return $reservation;
}

/**
 * @OA\Delete(
 *     path="/api/reservations/{id}",
 *     summary="Delete a reservation",
 *     tags={"Reservations"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Reservation ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Reservation deleted"
 *     )
 * )
 */
public function destroy($id)
{
    $reservation = Reservation::findOrFail($id);
    $reservation->delete();
    return response()->json(null, 204);
}
}
