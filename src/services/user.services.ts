import prisma from "../lib/prisma_client";

export interface createUserPayload
{
  name: string;
  email: string;
  streamId: string;
}

export interface createStreamPayload
{
  name: string;
}

export interface createCoursePayload
{
  name: string;
  streamId: string;
}


class UserServices
{
  static async getUsers()
  {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getUsersById(id: string)
  {
    return await prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  static async getUsersByStreamId(streamId: string)
  {
    return await prisma.user.findMany({
      where: {
        streamId
      }
    });
  }

  static async createUser({ name, email, streamId }: createUserPayload)
  {
    return await prisma.user.create({
      data: {
        name,
        email,
        userStream: {
          connect: {
            id: streamId
          }
        },
      }
    });
  }

  static async getStreams()
  {
    return await prisma.stream.findMany();
  }

  static async getStreamsById(id: string)
  {
    return await prisma.stream.findUnique({
      where: {
        id
      }
    })
  }

  static async createStream({ name }: createStreamPayload)
  {
    return await prisma.stream.create({
      data: {
        name
      }
    })
  }

  static async getCourses()
  {
    return await prisma.course.findMany();
  }

  static async getCoursesById(id: string)
  {
    return await prisma.course.findUnique({
      where: {
        id
      }
    })
  }

  static async getCoursesByStreamId(streamId: string)
  {
    return await prisma.course.findMany({
      where: {
        streamId
      }
    });
  }

  static async createCourse({ name, streamId }: createCoursePayload)
  {
    return await prisma.course.create({
      data: {
        name,
        courseStream: {
          connect: {
            id: streamId
          }
        }
      }
    })
  }
}

export default UserServices;