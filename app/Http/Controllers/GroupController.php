<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Repositories\GroupRepository;
use Flash;
use Illuminate\Http\Request;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class GroupController extends AppBaseController
{
    /** @var  GroupRepository */
    private $groupRepository;

    public function __construct(GroupRepository $groupRepo)
    {
        $this->groupRepository = $groupRepo;
    }

    /**
     * Display a listing of the Group.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->groupRepository->pushCriteria(new RequestCriteria($request));
        $groups = $this->groupRepository->all();

        return view('groups.index')
            ->with('groups', $groups);
    }

    /**
     * Show the form for creating a new Group.
     *
     * @return Response
     */
    public function create()
    {
        return view('groups.create');
    }

    /**
     * Store a newly created Group in storage.
     *
     * @param CreateGroupRequest $request
     *
     * @return Response
     */
    public function store(CreateGroupRequest $request)
    {
        $input = $request->all();

        $group = $this->groupRepository->create($input);

        Flash::success('Group saved successfully.');

        return redirect(route('groups.index'));
    }

    /**
     * Display the specified Group.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('groups.index'));
        }

        return view('groups.show')->with('group', $group);
    }

    /**
     * Show the form for editing the specified Group.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('groups.index'));
        }

        return view('groups.edit')->with('group', $group);
    }

    /**
     * Update the specified Group in storage.
     *
     * @param  int              $id
     * @param UpdateGroupRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateGroupRequest $request)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('groups.index'));
        }

        $group = $this->groupRepository->update($request->all(), $id);

        Flash::success('Group updated successfully.');

        return redirect(route('groups.index'));
    }

    /**
     * Remove the specified Group from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('groups.index'));
        }

        $this->groupRepository->delete($id);

        Flash::success('Group deleted successfully.');

        return redirect(route('groups.index'));
    }
}
