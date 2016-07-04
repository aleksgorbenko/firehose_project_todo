class TasksController < ApplicationController
  def index
    render json: Task.order(:id)
  end

  def create
    task = Task.create(task_params)
    if task.valid?
      render json: task
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find_by_id(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:done, :title)
  end
end
